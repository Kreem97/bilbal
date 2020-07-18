const router = require('express').Router();
const jsonParser = require('body-parser').json();
const sampleRepository = require('../repositories/sampe');

function sample(config, logger) {
    router.get('/', (req, res) => {
        sampleRepository.getSamples(logger, function (err, result) {
            if (err) {
                logger.error("Error getting all samples");
                res.statusCode = 500;
                res.json(err);
            } else if (result) {
                logger.debug("Found all samples");
                res.json(result);
            } else {
                logger.debug("No samples found");
                res.sendStatus(404);
            }
        });
    });

    router.get('/:sampleField', (req, res) => {
        sampleRepository.getSample({ sampleField: req.params.sampleField }, logger, function (err, result) {
            if (err) {
                logger.error("Error getting sample");
                res.statusCode = 500;
                res.json(err);
            } else if (result) {
                logger.debug("Found sample");
                res.json(result);
            } else {
                logger.debug("No sample found");
                res.sendStatus(404);
            }
        });
    });

    router.post('/', jsonParser, (req, res) => {
        let data = verifySample(req.body);
        if (data == null) {
            logger.debug("Bad request to create sample");
            res.statusCode = 400;
            res.json(req.body);
            return;
        }

        sampleRepository.createSample(data, logger, function (err, result) {
            if (err) {
                logger.error("Error creating sample");
                res.statusCode = 500;
                res.json(err);
            } else {
                logger.debug("Sample created");
                res.statusCode(201);
                res.json(data);
            }
        });
    });

    router.put('/:sampleField', jsonParser, (req, res) => {
        let data = verifySample(req.body);
        if (data == null) {
            logger.debug("Bad request to update sample");
            res.statusCode = 400;
            res.json(req.body);
            return;
        }

        sampleRepository.updateSample({ sampleField: req.params.sampleField }, data, logger, function (err, result) {
            if (err) {
                logger.error("Error updating sample");
                res.statusCode = 500;
                res.json(err);
            } else {
                logger.debug("Sample updated");
                res.statusCode = 200;
                res.json(data);
            }
        });
    });

    router.delete('/:sampleField', jsonParser, (req, res) => {
        sampleRepository.deleteSample({ sampleField: req.params.sampleField }, logger, function (err, result) {
            if (err) {
                logger.error("Error deleting sample");
                res.statusCode = 500;
                res.json(err);
            } else {
                logger.debug("Sample deleted");
                res.sendStatus(200);
            }
        });
    });

    return router;
}

function verifySample(body) {
    if(body.sampleField){
        return { sampleField: body.sampleField }
    }

    return null;
}

module.exports = {
    sample: sample
};