/**
 * Router for /api/testroute/
 */
const logger = require('../../../logger');
const router = require('express').Router();
const path = require('path');

// define the home page route
router.get('/', function (req, res) {
  logger.trace('Routing to /api/testroute');
  res.send('api/testroute');
});

// define the about route
router.post('/', function (req, res) {
  const body = req.body;
  logger.trace({ body: body });
  res.status(201).send('This was a post request');
});

// routes handled in submodules
router.use('/subroute', require('./subroute'));

module.exports = router;
