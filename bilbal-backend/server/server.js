const express = require('express');
const http = require('http');
const winston = require('winston');
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
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console());
}

logger.info("Setting routes");
app.use('/', controllers.sample.getRequest(depInj));

logger.info("Starting server");
const server = http.createServer(app);
server.listen(process.env.PORT || '8080');
logger.info("Server started and listening on port " + (process.env.PORT || '8080'));

module.exports = app;
