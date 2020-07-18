const sample = require('./sample');

function setRoutes(app, config, logger) {
    app.use('/sample', sample.sample(config, logger));
}

module.exports = {
    setRoutes: setRoutes
};