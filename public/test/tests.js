QUnit.module( "Configuration", function() {
    QUnit.test( "Load Configuration", function( assert ) {
        var done = assert.async();
        $.ajax({
            url: '../common/data.json',
            dataType: 'json',
            success: function( config ) {
                assert.equal( typeof config, "object", "Assert Type of Config" );
                assert.equal( config.TIMELINES instanceof Object, true, "Assert Instance of Tiimelines" );
                done();
            }
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
});