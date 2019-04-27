from __future__ import unicode_literals

import sys
import time

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from datetime import datetime

class NavigationTimingAPI(object):

    def _create_dict_of_timings(self, driver, site):
        return driver.execute_script("return window.performance.timing.toJSON()")

    def apply(self, site, driver):
        driver.get(site)
        return self._create_dict_of_timings(driver, site)