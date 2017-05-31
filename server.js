var express = require( 'express' );
app = express();

var port = process.env.PORT || 8080;

app.listen( port, function() {
    console.log( 'Your application is running successfully on port ' + port );
});

require( './config' )( app );
require( './routes' )( app );