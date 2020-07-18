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
    logger: {
        logLevel: {
            doc: 'Log Level.',
            format: String,
            default: "debug",
            env: 'LOG_LEVEL'
        },
        logDir: {
            doc: 'Directory to write log files to.',
            format: String,
            default: "./logs",
            env: 'LOG_DIR'
        }
    },
    mongo: {
        connectionString: {
            doc: 'Mongo Connection String',
            format: String,
            default: 'mongodb://localhost:27017',
            env: 'MONGO_CONNSTR'
        },
        name: {
            doc: 'Mongo Database name',
            format: String,
            default: 'sampleDatabase',
            env: 'MONGO_DBNAME'
        }
    }
});

const env = schema.get('env');
schema.loadFile(__dirname + "/" + env + '.json');

schema.validate({allowed: 'strict'});

const config = {
    port: schema.get('port'),
    logger: {
        logLevel: schema.get('logger.logLevel'),
        logDir: schema.get('logger.logDir')
    },
    mongo: {
        connectionString: schema.get('mongo.connectionString'),
        name: schema.get('mongo.name')
    }
}

module.exports = config;