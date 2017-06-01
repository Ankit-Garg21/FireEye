function Mockup() {};

Mockup.pageId = "pgMockup";
Mockup.config = {
    TIMELINES: [
        "ankit00239",
        "virendersehwag"
    ]
};

//<a class="twitter-timeline" href="https://twitter.com/ankit00239">Tweets by ankit00239</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Mockup.init = function() {
    $( ".page" ).hide();
    $( "#" + Mockup.pageId ).show();

    var config = Mockup.config;
    Mockup.loadTimelines( config )
};

Mockup.bind = function() {
    
};

Mockup.loadTimelines = function( config ) {
    config.TIMELINES && config.TIMELINES.forEach( function( timeline ) {
        var html = "";
        html += '<a class="twitter-timeline" href="https://twitter.com/' + timeline +'">';
        html += 'Tweets by ' + timeline;
        html += '</a>';
        html += '<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>';

        $( "#" + Mockup.pageId + " .container" ).append( html );
    });
}