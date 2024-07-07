const axios = require('axios');
const logger = require('../logger');

const authServiceUrl = process.env.AUTH_SERVER_URL;

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  logger.trace(`User auth-service: ${authServiceUrl}`);
  logger.trace({ email: email, pw: password });

  try {
    // Send a POST request to the external authentication service
    const response = await axios.post(`${authServiceUrl}/api/sessions`, {
      email: email,
      password: password,
    });

    // Returned Data from Server
    const { accessToken, refreshToken } = response.data;
    logger.trace(accessToken);

    // set session in browser
    try {
      localStorage.setItem('token', `Bearer ${accessToken}`);
    } catch (error) {
      logger.error(`${error} - localStorage not set!`);
    }

    return res.status(201).send('Login successful!');
  } catch (error) {
    logger.error(`${error}`);
    // Handle errors (e.g., invalid credentials, service down)
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

const hasRequestAuthentication = async (req) => {
  const token = req.headers['authorization'];

  if (!token) {
    logger.trace('No Request Authentication Provided!');
    return false;
  }
  logger.trace('Request Authentication Provided!');

  return token;
};

const hasLocaleStorageAuthentication = async () => {
  let token = '';

  // set session in browser
  try {
    token = localStorage.get('token');
  } catch (error) {
    logger.error(`${error} - no token found in localStorage!`);
  }

  if (!token) {
    logger.trace('No localStorage Authentication Provided!');
    return false;
  }
  logger.trace('localStorage Authentication Provided!');

  return token;
};

const checkAuthMiddleware = async (req, res, next) => {
  let token = '';
  // check for request auth and if not set try and set local storage auth
  const requestAuth = await hasRequestAuthentication(req);
  logger.trace(requestAuth);

  if (requestAuth !== false) {
    token = requestAuth;
  }
  if (requestAuth === false) {
    const localStorageAuth = await hasLocaleStorageAuthentication();
    logger.trace(localStorageAuth);
    if (localStorageAuth !== false) {
      token = localStorageAuth;
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'No Authentication Token Provided!' });
  }

  try {
    // Verify token with the external authentication service
    const response = await axios.get(`${authServiceUrl}/api/auth`, {
      headers: { Authorization: token },
    });

    // set request header authorization
    req.headers['authorization'] = token;
    next();
  } catch (error) {
    // Handle errors (e.g., invalid token, service down)
    logger.error(`${error}`);
    return res
      .status(401)
      .json({ error: 'Token verification failed. Are you logged in?' });
  }
};

module.exports = {
  loginUser,
  checkAuthMiddleware,
};
