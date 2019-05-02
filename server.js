var http = require('http')
var url = require('url')
var fs = require('fs')
var exec = require('child_process').exec
var path = require('path')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path
const uuid = require('uuid/v4')



var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  file_name = uuid() + ".json";
  var txt = binPath  + " " + __dirname + "/fetch_timings.js " + q.address + " " + file_name;
  console.log(txt)
  exec(txt, function(error, stdout, stderr, callback) {
    console.log(stdout);
    contents = fs.readFileSync(file_name, 'utf8');
    fs.unlinkSync(file_name);
    console.log(contents);
    process.exit()
  })
}).listen(8000);