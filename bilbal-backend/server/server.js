const express = require('express');
const http = require('http');
const controllers = require('./controllers');

const app = express();
const depInj = "my injection";

app.use('/', controllers.sample.getRequest(depInj));

const server = http.createServer(app);
server.listen(process.env.PORT || '8080');

module.exports = app;
