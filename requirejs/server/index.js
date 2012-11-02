var express =   require( 'express' );
var app =       express();
var baseDir =   __dirname + '/../';

app.use( '/', express.static( baseDir + 'www' ) );

app.listen(3000);

console.log('listening on localhost:3000');