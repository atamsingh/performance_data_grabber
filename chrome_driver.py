from __future__ import unicode_literals

import sys
import time

from datetime import datetime
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait

class ChromeBrowser(object):

	def __init__(self):
		self.browser = self.get_chrome_browser()

	def _config_chrome_options(self):
		chrome_options = webdriver.ChromeOptions()
		chrome_options.add_argument('--headless')
		chrome_options.add_argument("--no-sandbox")
		chrome_options.add_argument("--aggressive-cache-discard")
		chrome_options.add_argument("--disk-cache-size=1")
		return chrome_options

	def _set_port(self, port=0):
		return port

	def _instantiate_browser(self):
		chrome_options = self._config_chrome_options()
		return webdriver.Chrome(executable_path=ChromeDriverManager().install(), chrome_options=chrome_options, port=self._set_port())

	def get_chrome_browser(self):
		return self._instantiate_browser()

	def get(self, site):
		result = self.browser.get(site)
		self.cycle_driver()
		return result

	def execute_script(self, cmd):
		result = self.browser.execute_script(cmd)
		self.cycle_driver()
		return result

	def cycle_driver(self):
		self.browser.quit()
		self.browser = self.get_chrome_browser()
