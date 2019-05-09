#!/bin/bash

cd /
sudo mkdir app
cd /app/

# GET PHANTOMJS
sudo apt-get update
sudo apt-get install build-essential chrpath libssl-dev libxft-dev libfreetype6-dev libfreetype6 libfontconfig1-dev libfontconfig1 uuid git -y
sudo wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 -O /app/phantomjs.tar.bz2
sudo tar xvjf /app/phantomjs.tar.bz2 -C /app/

# CLONE PROJECT FROM GIT
git clone --bare /atamsingh/performance_data_grabber /app/

# GET NODE AND NPM
sudo apt-get install -y curl python-software-properties
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs

# KICK APP IN BACKGROUND
sudo node /app/server.js &
EOF