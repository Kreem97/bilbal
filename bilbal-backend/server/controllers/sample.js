const router = require('express').Router();

const getRequest = function (depInj) {
  router.get('/sample', (req, res) => {
    res.send(depInj);
  });
  return router;
};

module.exports = {
  getRequest: getRequest
};
