var fs = require('fs')
var system = require('system')

console.log('fetch timings accessed!')
url = system.args[1]
file_name = system.args[2]
var page = require('webpage').create();
page.clearMemoryCache();

window.setTimeout(function(){
  console.log('URL did not work')
	page.close();
  phantom.exit()
}, 20000);
page.open(url, function (status) {
	if (status == 'success'){
		window.setTimeout(function () { 
			var webpage_navigation_data = page.evaluate(function(){
				return JSON.stringify(window.performance.timing);
			})

      fs.write(file_name, webpage_navigation_data, 'w')
      phantom.exit()
		}, 7000);
	}
});