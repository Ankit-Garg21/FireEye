QUnit.test( "Load Configuration", function( assert ) {
    var done = assert.async();
    $.ajax({
        url: '../common/data.json',
        dataType: 'json',
        success: function( config ) {
            assert.equal( typeof config, "object", "Assert Type of Config" );
            assert.equal( config.TIMELINES instanceof Array, true, "Assert Instance of Tiimelines" );
            assert.equal( isEmpty( config.TIMELINES ), false, "Assert Length of Tiimelines" );
            done();
        }
    });
});