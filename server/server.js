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
const port = process.env.BACKEND_PORT || 5000;
const bodyParser = require('body-parser');

// body parsers
// create application/json parser
var jsonParser = bodyParser.json();
// create text/html parser
var textParser = bodyParser.text({ type: 'text/html' });
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//add parsers to express
app.use(jsonParser, textParser, urlencodedParser);

const middleware1 = (req, res, next) => {
  logger.debug('Call Middleware 1');
  // Tasks
  next();
};

const middleware2 = (req, res, next) => {
  logger.debug('Call Middleware 2');
  // Tasks
  next();
};

app.use('/api', middleware1, middleware2, require('./routes/api/index'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
