/**
 * Route: /api/
 */
const logger = require('../../logger');
const router = require('express').Router();
const path = require('path');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  logger.trace(`Time: ${Date.now()}`);
  next();
});

// routes handled for submodules
router.use('/', require('./open'));

module.exports = router;
