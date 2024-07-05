/**
 * Router for /router1/router2/
 */
const logger = require('../logger');
const router = require('express').Router();
const path = require('path');

//##########################
// Router TEMPLATE
//##########################
router.get('/', function (req, res) {
  logger.trace('Routing to /router1/router2/');
  // Set Header
  res.set({
    'Content-Type': 'text/plain',
    'Content-Length': '123',
    ETag: '12345',
  });
  // response chaining with cookies
  res
    .status(201)
    .cookie('access_token', 'Bearer ' + token, {
      expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
    })
    .cookie('test', 'test')
    .redirect(301, '/admin');
});

router.post('/', function (req, res) {
  req.accepts('text/html');
  // => "text/html"
  req.accepts('application/json');
  // => "application/json"

  if (!req.is('text/html') && !req.is('application/json')) {
    res.status(404).send('Content Type not accepted!');
  }

  logger.trace('Routing to /router1/router2/');
  res.status(201).send('/router1/router2/');
});

router.put('/', function (req, res) {
  logger.trace('Routing to /router1/router2/');

  res.status(403).end();
  res.status(400).send('Bad Request');
  res.status(404).sendFile('/absolute/path/to/404.png');
});

router.delete('/', function (req, res) {
  logger.trace('Routing to /router1/router2/');
  res.status(201).send('/router1/router2/');
});

router.head('/', function (req, res) {
  logger.trace('Routing to /router1/router2/');
  res.status(201).send('/router1/router2/');
});

router.options('/', function (req, res) {
  logger.trace('Routing to /router1/router2/');
  res.status(201).send('/router1/router2/');
});

router.trace('/', function (req, res) {
  logger.trace('Routing to /router1/router2/');
  res.status(201).send('/router1/router2/');
});

router.connect('/', function (req, res) {
  logger.trace('Routing to /router1/router2/');
  res.status(201).send('/router1/router2/');
});

router.patch('/', function (req, res) {
  logger.trace('Routing to /router1/router2/');
  res.status(201).send('/router1/router2/');
});

//##########################

module.exports = router;
