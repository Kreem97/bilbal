const convict = require('convict');

const schema = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development'],
        default: 'development',
        env: 'NODE_ENV'
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 8080,
        env: 'PORT',
        arg: 'port'
    },
    logDir: {
        doc: 'Directory to write log files to.',
        format: String,
        default: "./logs",
        env: 'LOG_DIR'
    }
});

const env = schema.get('env');
schema.loadFile(__dirname + "/" + env + '.json');

schema.validate({allowed: 'strict'});

const config = {
    port: schema.get('port'),
    logDir: schema.get('logDir')
}

module.exports = config;