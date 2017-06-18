function Mockup() {};

Mockup.pageId = "pgMockup";

Mockup.init = function() {
    $( ".page" ).hide();
    $( "#" + Mockup.pageId ).show();

    $( "#" + Mockup.pageId + " .container .resp-tabs-list" ).empty();
    $( "#" + Mockup.pageId + " .container .resp-tabs-container" ).empty();

    $.ajax( {
        url: 'common/data.json',
        dataType: 'json',
        success: function( config ) {
            console.log(config);
            Mockup.loadTimelines( config );
        }
    });
};

Mockup.loadTimelines = function( config ) {
    Object.keys( config.TIMELINES ).forEach( function( timeline ) {
        var contentHtml = "";
        var listHtml = "";

        listHtml += '<li>' + timeline + '</li>';

        contentHtml += '<div>';
        contentHtml += Mockup.generateTimelineContent( timeline, config ) + '</div>';

        $( "#" + Mockup.pageId + " .container .resp-tabs-list" ).append( listHtml );
        $( "#" + Mockup.pageId + " .container .resp-tabs-container" ).append( contentHtml );
    });

    $( "#" + Mockup.pageId + " #feeds-tab" ).easyResponsiveTabs( {
        type: 'default',        
        width: 'auto',
        fit: true,
        closed: false,
        tabidentify: "feeds",
        activate: function() { console.log( "Switch" ); }
    });
};

Mockup.generateTimelineContent = function( timeline, config ) {
    var timelineContent = "";

    timelineContent += "<div class=\"timeline-header\">" + Mockup.generateHeader( timeline ) + "</div>";
    timelineContent += "<div class=\"timeline-body\">" + Mockup.generateContent( timeline, config ) + "</div>";
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

Mockup.generateContent = function( timeline, config ) {
    var bodyConent = "";
    var tweets = config.TIMELINES[ timeline ].POSTS;
    bodyConent += '<div class="timeline-viewport"><ol class="timeline-tweetlist">';
    tweets && tweets.forEach( function() {
        bodyConent += '<li class="timeline-tweetlist-tweet content-border">'
        bodyConent += '</li>';
    });
    bodyConent += "</ol></div>";

    return bodyConent;
};

Mockup.generateFooter = function( timeline ) {
    var footerConent = "";
    footerConent += '<a class="timeline-footer-link float-right" href="https://twitter.com/' + timeline + '">';
    footerConent += 'View on Twitter </a>';
    return footerConent;
};