const path = require('path');
const express = require('express');
const http = require('http');
const winston = require('winston');
const config = require('./config');
const controllers = require('./controllers');

const app = express();
const depInj = "my injection";
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()
    ),
    transports: [
        new winston.transports.File({ filename: path.join(config.logDir, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(config.logDir, 'combined.log') })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console());
}

logger.info("Setting routes");
app.use('/', controllers.sample.getRequest(depInj));

logger.info("Starting server");
const server = http.createServer(app);
server.listen(config.port);
logger.info("Server started and listening on port " + config.port);

module.exports = app;