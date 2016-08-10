var finalhandler = require('finalhandler')
var http = require('http')
var morgan = require('morgan')

var PORT = 3000;
console.log(process.argv);
var newPort = 0;

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
var logger = morgan('combined')

var server = http.createServer(function (req, res) {
  var done = finalhandler(req, res)
  logger(req, res, function (err) {
    if (err) return done(err)
 
    // respond to request 
    res.setHeader('content-type', 'text/plain')
    res.end('hello, world!')
  })
})

server.listen(PORT)
console.log(`Server running at ` + PORT);