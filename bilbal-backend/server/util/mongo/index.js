const config = require('../../config');
const mongoClient = require('mongodb').MongoClient;

const mongoConfig = config.mongo;

function getAll(collection, logger, callback) {
    mongoClient.connect(mongoConfig.connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
        if (err) {
            handleError(err, "Error connecting to mongo", callback, logger);
            return;
        }

        client.db(mongoConfig.name).collection(collection).find().toArray((err, items) => {
            if (err) {
                handleError(err, "Error retrieving data from mongo", callback, logger);
                return;
            }

            callback(err, items);

            client.close();
        });
    });
}

function get(data, collection, logger, callback) {
    mongoClient.connect(mongoConfig.connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
        if (err) {
            handleError(err, "Error connecting to mongo", callback, logger);
            return;
        }

        client.db(mongoConfig.name).collection(collection).findOne(data, (err, item) => {
            if (err) {
                handleError(err, "Error retrieving data from mongo", callback, logger);
                return;
            }

            callback(err, item);

            client.close();
        });
    });
}

function post(data, collection, logger, callback) {
    mongoClient.connect(mongoConfig.connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
        if (err) {
            handleError(err, "Error connecting to mongo", callback, logger);
            return;
        }

        client.db(mongoConfig.name).collection(collection).insertOne(data, (err, result) => {
            if (err) {
                handleError(err, "Error writing data to mongo", callback, logger);
                return;
            }

            callback(err, result);

            client.close();
        });
    });
}

function put(data, newData, collection, logger, callback) {
    mongoClient.connect(mongoConfig.connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
        if (err) {
            handleError(err, "Error connecting to mongo", callback, logger);
            return;
        }

        client.db(mongoConfig.name).collection(collection).updateOne(data, {'$set': newData}, (err, result) => {
            if (err) {
                handleError(err, "Error updating data to mongo", callback, logger);
                return;
            }

            callback(err, result);

            client.close();
        });
    });
}

function del(data, collection, logger, callback) {
    mongoClient.connect(mongoConfig.connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
        if (err) {
            handleError(err, "Error connecting to mongo", callback, logger);
            return;
        }

        client.db(mongoConfig.name).collection(collection).deleteOne(data, (err, result) => {
            if (err) {
                handleError(err, "Error deleting data from mongo", callback, logger);
                return;
            }

            callback(err, result);

            client.close();
        });
    });
}

function handleError(err, message, callback, logger) {
    logger.error(message + ": " + err);
    callback(err);
}

module.exports = {
    getAll: getAll,
    get: get,
    post: post,
    put: put,
    del: del
};