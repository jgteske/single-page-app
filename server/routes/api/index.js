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

// define the home page route
router.get('/', function (req, res) {
  logger.trace('Routing to /api/');
  res.send('Home route for api');
});

// define the about route
router.get('/about', function (req, res) {
  res.send('About api');
});

router.post('/', function (req, res) {
  const payload = req.body;
  logger.trace({ payload: payload });

  try {
    logger.trace(typeof payload);
    var data = {};
    var data = payload;

    if (typeof payload === 'object') {
      data.serverTest =
        'This lines was added! File was at Server and modified!';
    }

    res.status(201).json(data);
  } catch {
    res.status(500).send('Error with data');
  }
});

// routes handled for submodules
router.use('/testroute', require('./testroute'));
router.use('/testroute1', require('./testroute/testroute1'));

module.exports = router;
