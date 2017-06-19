QUnit.module( "Configuration", function() {
    
    QUnit.test( "Load Configuration", function( assert ) {
        var done = assert.async();
        loadConfig( function( config ) {
            Mockup.config = config;
            assert.equal( typeof config, "object", "Assert Type of Config" );
            assert.equal( config.TIMELINES instanceof Object, true, "Assert Instance of Tiimelines" );
            done();
        });
    });

    QUnit.test( "Generate Header", function( assert ) {
        var done = assert.async();
        var header = $( Mockup.generateHeader( "ankit00239" ) );
        var headerName = header.find( ".timeline-header-name" );

        assert.equal( header.hasClass( "timeline-header-title" ), true, "Assert Header Title Present" );
        assert.equal( header.length, 1, "Assert Header Name Present" );
        done();
    });

    QUnit.test( "Generate Footer", function( assert ) {
        var done = assert.async();
        var footer = $( Mockup.generateFooter( "ankit00239" ) );

        assert.equal( footer.hasClass( "timeline-footer-link" ), true, "Assert Footer Present" );
        done();
    });

    QUnit.test( "Generate Timeline", function( assert ) {
        var done = assert.async();
        var timeline = $( Mockup.generateTimelineContent( "ankit00239", Mockup.config ) );

        assert.equal( timeline.hasClass( "timeline-header" ), true, "Assert Header Present" );
        assert.equal( timeline.hasClass( "timeline-body" ), true, "Assert Content Present" );
        assert.equal( timeline.hasClass( "timeline-footer" ), true, "Assert Footer Present" );
        done();
    });

    QUnit.test( "Embed Media", function( assert ) {
        var done = assert.async();
        var url = "http://youtu.be/0qV8j9m4ckE";
        var media = Mockup.embedMedia( url );
        media = $( media );
        var urlId = url.substr( url.lastIndexOf( "/" ) );

        assert.equal( media.hasClass( "tweet-iframe-media" ), true, "Assert Media IFrame Present" );
        assert.equal( media.attr( "src" ), "http://www.youtube.com/embed" + urlId, "Assert Youtube SRC" );

        url = "https://vimeo.com/157179553";
        urlId = url.substr( url.lastIndexOf( "/" ) );
        media = Mockup.embedMedia( url );
        media = $( media );
        assert.equal( media.hasClass( "tweet-iframe-media" ), true, "Assert Media IFrame Present" );
        assert.equal( media.attr( "src" ), "//player.vimeo.com/video" + urlId, "Assert Vimeo SRC" );
        done();
    });
});