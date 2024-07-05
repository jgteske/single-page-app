/**
 * Router for /api/testroute/subroute
 */
const logger = require('../../../../logger');
const router = require('express').Router();
const path = require('path');

//##########################
// Router TEMPLATE
//##########################
router.get('/', function (req, res) {
  logger.trace('Routing to /api/testroute/subroute');
  res.status(201).send('api/testroute/subroute');
});
//##########################

module.exports = router;
