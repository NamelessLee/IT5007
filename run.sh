#!/bin/bash

npm install

mongo NUSAssistant scripts/init.mongo.js

nodemon -w server -e js,graphql server/server.js &

 node app.js