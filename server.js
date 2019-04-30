var webserver = require('webserver');
var system = require('system');

function urlToAddress(url_string) {
	var rx = /address=(.+?)(&|$)/gm;
	var arr = rx.exec(url_string);
	return arr[1]
}

var server = webserver.create();
console.log('starting server...')
var service = server.listen('0.0.0.0:8000', function(request, response) {
	url = urlToAddress(request.url);
	console.log(url)
	var page = require('webpage').create();
	page.clearMemoryCache();
	window.setTimeout(function(){
		response.statusCode = 408;
		response.write("");
		response.close();
		page.close();
	}, 20000);
	page.open(url, function (status) {
		if (status == 'success'){
			window.setTimeout(function () { 
				var webpage_navigation_data = page.evaluate(function(){
					return JSON.stringify(window.performance.timing);
				})
				response.statusCode = 200;
				response.write(webpage_navigation_data);
				response.close();
			}, 7000);
		}
	})
});