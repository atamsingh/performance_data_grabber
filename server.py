from flask import Flask, request
from chrome_driver import ChromeBrowser
from navigation_timing_api_extractor import NavigationTimingAPI
import json

chrome = ChromeBrowser()
app = Flask(__name__)

@app.route('/navigation_timing_api', methods=['GET'])
def handle_navigation_api():
    address_to_be_pinged = request.args['address']
    return json.dumps(NavigationTimingAPI().apply(address_to_be_pinged, chrome))

@app.route('/services/ping', methods=['GET'])
def handle_service_ping():
    return "OK"

if __name__ == '__main__':
	app.run()