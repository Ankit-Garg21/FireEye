function Mockup() {};

Mockup.pageId = "pgMockup";
Mockup.config = {
    TIMELINES: [
        "ankit00239",
        "virendersehwag",
        "narendramodi"
    ]
};

//<a class="twitter-timeline" href="https://twitter.com/ankit00239">Tweets by ankit00239</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Mockup.init = function() {
    $( ".page" ).hide();
    $( "#" + Mockup.pageId ).show();

    $( "#" + Mockup.pageId + " .container .resp-tabs-list" ).empty();
    $( "#" + Mockup.pageId + " .container .resp-tabs-container" ).empty();

    var config = Mockup.config;
    Mockup.loadTimelines( config )
};

Mockup.bind = function() {
    
};

Mockup.loadTimelines = function( config ) {
    config.TIMELINES && config.TIMELINES.forEach( function( timeline ) {
        var contentHtml = "";
        var listHtml = "";

        listHtml += '<li>' + timeline + '</li>';

        contentHtml += '<div><a class="twitter-timeline" href="https://twitter.com/' + timeline +'">';
        contentHtml += 'Tweets by ' + timeline;
        contentHtml += '</a>';
        contentHtml += '<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></div>';

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