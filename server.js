var http = require('http')
var url = require('url')
var exec = require('child_process').exec
var phantomjs = require('phantomjs')

var binPath = '/repo/node_modules/phantomjs/lib/phantom/bin/phantomjs'
console.log(binPath)

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  var q = url.parse(req.url, true).query;
  var txt = binPath  + " " + "/repo/fetch_timings.js " + q.address;
  exec(txt, function(error, stdout, stderr) {
    response_array = stdout.split("\n");
    timings = response_array[response_array.length - 2];
    res.end(timings);
  })
}).listen(80);
