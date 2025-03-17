const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const authenticatedToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).send('Unauthorized');
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
}

module.exports = authenticatedToken;