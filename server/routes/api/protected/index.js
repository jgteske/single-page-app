/**
 * Router for /api/testroute/subroute
 */
const logger = require('../../../logger');
const router = require('express').Router();
const path = require('path');

router.get('/', function (req, res) {
  logger.trace('Routing to /api/protected');
  res.status(201).send('All api/protected routs');
});
//##########################

module.exports = router;
