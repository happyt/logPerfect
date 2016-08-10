var finalhandler = require('finalhandler')
var http = require('http')
var morgan = require('morgan')
var fs = require('fs')
var url = require('url')
var js2xmlparser = require("js2xmlparser")

var PORT = 3000;
console.log(process.argv);
var newPort = 0;

// run with 'node server 80' to use port 80
if (process.argv.length > 2) {
//  console.log("Length: " + process.argv.length)
  newPort = Number(process.argv[2]);
//  console.log('Param: ' + newPort);
  if (newPort > 0) {
//    console.log(newPort)
    PORT = newPort;
  } 
}

// create "middleware" 
var logger = morgan('combined');

var server = http.createServer(function (req, res) {
  var done = finalhandler(req, res);
  logger(req, res, function (err) {
    if (err) return done(err);
 
	var url_parts = url.parse(req.url, true)
	console.log(url_parts)
	var thejson = url_parts.query.shotdata.toUpperCase()
	thejson = thejson.replace(/FALSE/g, "false")
//	delete thejson.startingPosition
//	delete thejson.finishingPosition
	
	console.log(thejson)
	console.log("===")
	var thexml = js2xmlparser("SHOT", thejson)
 	fs.writeFile("T:/golfFeeds/PPTrackman.xml", thexml, function(err) {
		if (err) {
			return console.log(err);
		}
	})
    // respond to request 
    res.setHeader('content-type', 'text/plain');
    res.end('writing file');
	
  })
})


server.listen(PORT)
console.log("Server listening at " + PORT);
