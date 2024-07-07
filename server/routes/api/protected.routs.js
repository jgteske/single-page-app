/**
 * Route: /api/
 */
const logger = require('../../logger');
const router = require('express').Router();
const path = require('path');

// routes handled for submodules
router.use('/', require('./protected'));

module.exports = router;
