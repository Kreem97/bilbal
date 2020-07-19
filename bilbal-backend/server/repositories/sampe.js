const mongo = require('../util/mongo');

const collection = "sampleCollection";

function getSamples(logger, callback) {
    mongo.getAll(collection, logger, function (err, result) {
        if (err) {
            callback(err, null);
            return
        }

        callback(null, result);
    });
}

function getSample(data, logger, callback) {
    mongo.get(data, collection, logger, function (err, result) {
        if (err) {
            callback(err, null);
            return
        }

        callback(null, result);
    });
}

function createSample(data, logger, callback) {
    mongo.post(data, collection, logger, function (err, result) {
        if (err) {
            callback(err, null);
            return
        }

        callback(null, result);
    });
}

function updateSample(data, newData, logger, callback) {
    mongo.put(data, newData, collection, logger, function (err, result) {
        if (err) {
            callback(err, null);
            return
        }

        callback(null, result);
    });
}

function deleteSample(data, logger, callback) {
    mongo.put(data, collection, logger, function (err, result) {
        if (err) {
            callback(err, null);
            return
        }

        callback(null, result);
    });
}

module.exports = {
    getSamples: getSamples,
    getSample: getSample,
    createSample: createSample,
    updateSample: updateSample,
    deleteSample: deleteSample
}