function Mockup() {};

Mockup.pageId = "pgMockup";

Mockup.init = function() {
    $( ".page" ).hide();
    $( "#" + Mockup.pageId ).show();
    Mockup.config = {};

    $( "#" + Mockup.pageId + " .container .resp-tabs-list" ).empty();
    $( "#" + Mockup.pageId + " .container .resp-tabs-container" ).empty();

    $.ajax( {
        url: 'common/data.json',
        dataType: 'json',
        success: function( config ) {
            Mockup.config = config;
            Mockup.loadTimelines( config );
        }
    });

    Mockup.bindEvents();
};

Mockup.bindEvents = function() {
    var overlay = '<div class="modal-overlay modal-close"></div>';
    $( "a[ data-modal-id ]" ).unbind( "click" );
    $( "a[ data-modal-id ]" ).bind( "click", function( e ) {
        e.preventDefault();
        $( "body" ).append( overlay );
        $( ".modal-overlay" ).fadeTo( 500, 0.7 );
		var modalBox = $( this ).attr( "data-modal-id" );
		$( "#" + modalBox ).fadeIn( $( this ).data() );
    });

    $( ".modal-close, .modal-overlay" ).click( function() {
        $( ".modal-box, .modal-overlay" ).fadeOut( 500, function() {
            $( ".modal-overlay" ).remove();
        });
    });

    $( "#" + Mockup.pageId + " .save-tweet" ).unbind( "click" );
    $( "#" + Mockup.pageId + " .save-tweet" ).bind( "click", function() {
        var tweet = {
            text: $( "#" + Mockup.pageId + " .create-tweet-text" ).val(),
            date: new Date().getTime()
        };
        var activeUser = $( "#" + Mockup.pageId + " .resp-tab-active" ).attr( "user" );
        //var userName = Mockup.config.TIMELINES[ activeUser ].userName;
        var tweetContent = Mockup.getTweetContent( activeUser, tweet );
        $( "#" + Mockup.pageId + " .resp-tab-content-active .timeline-tweetlist" ).prepend( tweetContent );
        $( ".modal-box, .modal-overlay" ).fadeOut( 500, function() {
            $( ".modal-overlay" ).remove();
        });
    });
};

Mockup.loadTimelines = function( config ) {
    Object.keys( config.TIMELINES ).forEach( function( timeline ) {
        var contentHtml = "";
        var listHtml = "";

        listHtml += '<li user=' + timeline + '>' + timeline + '</li>';

        contentHtml += '<div>';
        contentHtml += Mockup.generateTimelineContent( timeline, config ) + '</div>';

        $( "#" + Mockup.pageId + " .container .resp-tabs-list" ).append( listHtml );
        $( "#" + Mockup.pageId + " .container .resp-tabs-container" ).append( contentHtml );
    });

    $( "#" + Mockup.pageId + " #feeds-tab" ).easyResponsiveTabs({
        type: 'default',        
        width: 'auto',
        fit: true,
        closed: false,
        tabidentify: "feeds",
        activate: function() {

        }
    });
};

Mockup.generateTimelineContent = function( timeline, config ) {
    var timelineContent = "";

    timelineContent += "<div class=\"timeline-header\">" + Mockup.generateHeader( timeline ) + "</div>";
    timelineContent += "<div class=\"timeline-body\">" + Mockup.generateContent( timeline, config.TIMELINES[ timeline ] ) + "</div>";
    timelineContent += "<footer class=\"timeline-footer\">" + Mockup.generateFooter( timeline ) + "</footer>";

    return timelineContent;
};

Mockup.generateHeader = function( timeline ) {
    var headerConent = "";
    headerConent += '<h1 class="timeline-header-title">' + 'Tweets ';
    headerConent += '<span class="timeline-header-name">by <a class="twitter-timeline" href="https://twitter.com/"' + timeline +'">';
    headerConent += '@' + timeline;
    headerConent += '</a></span></h1>';

    return headerConent;
};

Mockup.generateContent = function( timeline, content ) {
    var bodyConent = "";
    //var userName = content.userName;
    var tweets = content && content.POSTS;
    bodyConent += '<div class="timeline-viewport"><ol class="timeline-tweetlist">';
    tweets && tweets.forEach( function( tweet ) {
        bodyConent += Mockup.getTweetContent( timeline, tweet );
    });
    bodyConent += "</ol></div>";

    return bodyConent;
};

Mockup.getTweetContent = function( timeline, tweet ) {
    var bodyContent = "";

    var timelineConfig = Mockup.config.TIMELINES[ timeline ];
    var userName = timelineConfig.userName;
    var icon = timelineConfig.icon;

    bodyContent += '<li class="timeline-tweetlist-tweet content-border">'
    bodyContent +=   '<div class="timeline-tweet-author">'
    bodyContent +=       '<span class="tweet-avatar">';
    bodyContent +=           '<img src="' + icon + '">';
    bodyContent +=       '</span>';
    bodyContent +=       '<a href="https://twitter.com/' + timeline + '" class="tweet-link">';
    bodyContent +=           '<span class="tweet-name">' + userName + '</span>';
    bodyContent +=           '<span class="tweet-user-link"> @' + timeline + '</span>';
    bodyContent +=       '</a>';
    bodyContent +=       '<i class="material-icons tweet-author-icon">whatshot</i>';
    bodyContent +=   '</div>';

    bodyContent +=   '<p class="timeline-tweet-content">';
    bodyContent +=  '<span>' + tweet.text + '</span>';
    if( tweet.mediaLink ) {
        var media = Mockup.embedMedia( tweet.mediaLink );
        bodyContent += media;
    }
    bodyContent +=   '</p>';
    bodyContent +=  '<div class="timeline-tweet-metadata"><a class="tweet-date">' + new Date( tweet.date ).toLocaleString() + '</a></div>';
    bodyContent += '</li>';

    return bodyContent;
};

Mockup.generateFooter = function( timeline ) {
    var footerConent = "";
    footerConent += '<a class="timeline-footer-link float-right" href="https://twitter.com/' + timeline + '">';
    footerConent += 'View on Twitter </a>';
    return footerConent;
};

Mockup.embedMedia = function( html ) {
    var pattern1 = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
    var pattern2 = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
    var pattern3 = /([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?(?:jpg|jpeg|gif|png))/gi;
    var replacement = "";

    if(pattern1.test(html)){
        replacement = '<iframe class="tweet-iframe-media" src="//player.vimeo.com/video/$1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        html = html.replace(pattern1, replacement);
    } else if(pattern2.test(html)){
        replacement = '<iframe class="tweet-iframe-media" src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>';
        html = html.replace(pattern2, replacement);
    } else if(pattern3.test(html)){
        replacement = '<a href="$1" target="_blank"><img class="sml tweet-iframe-media" src="$1" /></a><br />';
        html = html.replace(pattern3, replacement);
    } else {
        html = '<a href="' + html + '" target="_blank">' + html + '</a><br />';
    }    
    return html;
}