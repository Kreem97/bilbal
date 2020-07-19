const path = require('path');
const express = require('express');
const http = require('http');
const winston = require('winston');
const config = require('./config');
const controllers = require('./controllers');

const app = express();
const logger = winston.createLogger({
    level: config.logger.logLevel,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()
    ),
    transports: [
        new winston.transports.File({ filename: path.join(config.logger.logDir, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(config.logger.logDir, 'combined.log') })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console());
}

logger.debug("Setting routes");
controllers.setRoutes(app, config, logger);

logger.debug("Starting server");
const server = http.createServer(app);
server.listen(config.port);
logger.info("Server started and listening on port " + config.port);

module.exports = app;