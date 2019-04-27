#!/bin/bash
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
apt-get update
apt-get install -y google-chrome-stable
apt-get install -y python-setuptools
apt-get install -y chromium-browser
easy_install pip
pip install -r requirements.txt
FLASK_APP=server.py flask run -h 0.0.0.0 -p 80