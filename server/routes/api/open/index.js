/**
 * Router for /api/testroute/subroute
 */
const logger = require('../../../logger');
const router = require('express').Router();
const path = require('path');

router.get('/', function (req, res) {
  logger.trace('Routing to /api');
  res.status(201).send('all open routs');
});
//##########################

module.exports = router;
