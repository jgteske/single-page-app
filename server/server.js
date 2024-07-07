// Set node env for production with npm
// export NODE_ENV=production
// NODE_ENV=production node app.js
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const logger = require('./logger');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {
  loginUser,
  checkAuthMiddleware,
} = require('./middleware/authentication');

const port = process.env.BACKEND_PORT || 5000;

// body parsers
// create application/json parser
var jsonParser = bodyParser.json();
// create text/html parser
var textParser = bodyParser.text({ type: 'text/html' });
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//add parsers to express
app.use(jsonParser, textParser, urlencodedParser);

// Route Specific Middleware Type 1 (add to route as middleware) - called second
const middleware1 = (req, res, next) => {
  logger.trace('Call Middleware 1');
  // Tasks
  next();
};

app.post('/login', loginUser);

// Route Specific Middleware Type 2 - called first
app.all('/api', (req, res, next) => {
  logger.trace('Call Middleware 2');
  // Tasks
  next();
});

const logFullURLMiddleware = function (req, res, next) {
  const protocol = req.protocol;
  const host = req.hostname;
  const url = req.originalUrl;

  const fullUrl = `${protocol}://${host}:${port}${url}`;

  const responseString = `Full URL is: ${fullUrl}`;
  logger.trace(responseString);
  next();
};

// Mount open routers
app.use(
  '/api',
  logFullURLMiddleware,
  middleware1,
  require('./routes/api/open.routs')
);

// Mount protected routers
app.use(
  '/api/protected',
  logFullURLMiddleware,
  checkAuthMiddleware,
  require('./routes/api/protected.routs')
);

// Handle custom direct access tries which are not going to /api
//app.get('*', function (req, res) {
//  res.status(404).send('Access denied!');
//});

const baseURL = (req, res, next) => {
  const protocol = req.protocol;
  const host = req.hostname;
  const url = req.originalUrl;
  console.log(protocol);

  const fullUrl = `${protocol}://${host}:${port}${url}`;

  const responseString = `Full URL is: ${fullUrl}`;
  console.log(responseString);
  next();
};

// Function to get the base URL
function getBaseUrl(server) {
  const address = server.address();
  const host = address.address === '::' ? 'localhost' : address.address;
  const port = address.port;
  return `http://${host}:${port}`;
}

// Start Server and listen on Port
const server = app.listen(port, (error) => {
  const baseUrl = getBaseUrl(server);

  if (!error) {
    console.log();
    console.log('##################');
    console.log();
    console.log(
      `Server is Successfully Running, and listening on port ${port}`
    );
    console.log();
    console.log(`Visit the Server on the following Link: ${baseUrl}`);
    console.log();
    console.log('##################');
    console.log();
  } else console.log("Error occurred, server can't start", error);
});
