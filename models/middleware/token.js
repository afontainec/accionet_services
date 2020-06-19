const jwt = require('jsonwebtoken');

let TheWall;

const ONE_HOUR = 60 * 60;
const WINDOW = 7 * 24 * ONE_HOUR;
const secret = process.env.JWT_SECRET || 'JWT_CHINCHAY_CODE_SECRET';

const bootstrap = (thewall) => {
  TheWall = thewall;
};

const decodeToken = async (req, res, next) => {
  try {
    delete req.user_id;
    addIsNotAuthenticated(req);
    const authorizationHeader = req.get('Authorization');
    const token = extractToken(authorizationHeader);
    const decoded = decryptToken(token);
    if (!hasExpired(decoded)) await addIsAuthenticated(req, decoded);
    return next();
  } catch (error) {
    return next();
  }
};

const addIsAuthenticated = async (req, decoded) => {
  if (!req || !decoded) return;
  req.isAuthenticatedByToken = () => {
    return true;
  };
  req.user = {};
  req.user.id = decoded.user;
  req.user.access = await TheWall.findAccess({ user_id: req.user.id });
};

const addIsNotAuthenticated = (req) => {
  if (!req) return;
  req.isAuthenticatedByToken = () => {
    return false;
  };
};

const extractToken = (header) => {
  if (!header) throw new Error('no authorization header defined');
  const parts = header.split('Bearer ');
  if (parts.length !== 2) throw new Error('Auth header badly defined');
  return parts[1];
};

const decryptToken = (token) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

const hasExpired = (data) => {
  return !data || !data.exp || data.exp < new Date().getTime() / 1000;
};

const generate = (user) => {
  if (!user) throw new Error('No User defined');
  const expirationDate = new Date(new Date().getTime() + WINDOW * 1000);
  const token = jwt.sign(
    {
      user: user.id,
    },
    secret,
    { expiresIn: WINDOW },
  );
  return {
    token,
    expiration: expirationDate,
  };
};

const PUBLIC_METHODS = {
  decodeToken,
  generate,
  bootstrap,
};

if (process.env.NODE_ENV === 'test') {
  PUBLIC_METHODS.addIsAuthenticated = addIsAuthenticated;
  PUBLIC_METHODS.addIsNotAuthenticated = addIsNotAuthenticated;
  PUBLIC_METHODS.extractToken = extractToken;
  PUBLIC_METHODS.decryptToken = decryptToken;
  PUBLIC_METHODS.hasExpired = hasExpired;
}

module.exports = PUBLIC_METHODS;