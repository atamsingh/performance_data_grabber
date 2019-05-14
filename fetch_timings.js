var system = require('system')

console.log('fetch timings accessed!')
url = system.args[1]
var page = require('webpage').create();
page.clearMemoryCache();

window.setTimeout(function(){
  console.log('URL did not work')
	page.close();
  phantom.exit()
}, 60000);
page.open(url, function (status) {
	if (status == 'success'){
		window.setTimeout(function () { 
			var webpage_navigation_data = page.evaluate(function(){
				return JSON.stringify(window.performance.timing);
			})

      console.clear()
      console.log(webpage_navigation_data)
      phantom.exit()
		}, 7000);
	}
});
