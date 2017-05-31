function Mockup() {};

Mockup.pageId = "pgMockup";
Mockup.config = {};

Mockup.init = function() {
    $( ".page" ).hide();
    $( "#" + Mockup.pageId ).show();

    var config = Mockup.config;
    Mockup.bind();
};

Mockup.bind = function() {
    
};