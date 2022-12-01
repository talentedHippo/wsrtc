require('dotenv').config();
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const wsrtcServer = require('./wsrtc-server.js');

const httpPort = process.env.HTTP_PORT || 3000;
const httpsPort = process.env.HTTPS_PORT || 3001;


const app = express();
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});
app.use((req, res, next) => {
  if (req.url === '/config.json') {
    res.status(404);
    res.end();
  } else {
    next();
  }
});
const appStatic = express.static(__dirname);
app.use(appStatic);
app.get('*', (req, res, next) => {
  req.url = '404.html';
  res.set('Content-Type', 'text/html');
  next();
});
app.use(appStatic);

const servers = [];

const httpsServer = https.createServer({}, app)
    .listen(httpsPort);
servers.push(httpsServer);
console.log('https://localhost:' + httpsPort);
for (const server of servers) {
  wsrtcServer.bindServer(server);
}
