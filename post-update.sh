#!/bin/bash
PROJECTFOLDER=/home/user/angular_frontend
unset 'GIT_DIR'
cd $PROJECTFOLDER
forever stop src/server/app.js
git fetch origin && git pull origin master && bower install --allow-root && npm install && gulp build && sudo PORT=443 NODE_ENV=build forever start ./src/server/a$
mkdir -p build/src/client/styles
mkdir -p build/src/client/fonts
cp src/client/styles/styles.css build/src/client/styles/
cp src/client/fonts/* build/src/client/fonts/
exec git update-server-info
