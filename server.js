var http = require('http')
var url = require('url')
var fs = require('fs')
var exec = require('child_process').exec
var phantomjs = require('phantomjs')
var uuid = require('uuidv4')


var binPath = '/repo/node_modules/phantomjs/lib/phantom/bin/phantomjs'
console.log(binPath)

var server = http.createServer(function (req, res) {
  processRequest(req, res);
}).listen(80);

function processRequest(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  var q = url.parse(req.url, true).query;
  file_name = uuid() + ".json";
  var txt = binPath  + " " + "/repo/fetch_timings.js " + q.address + " " + file_name;
  console.log(txt)
  exec(txt, function(error, stdout, stderr, callback) {
    console.log("Reading file...")
    contents = fs.readFileSync(file_name, 'utf8');
    console.log("Deleting file...")
    fs.unlinkSync(file_name);
    console.log("File deleted");
    res.end(contents);
  })
}
