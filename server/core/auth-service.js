// hash passwords
// compare passwords
// generate token
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
}

const comparePasswords = (password, hash) => {
  return hashPassword(password) === hash;
}

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

module.exports = {
  hashPassword,
  comparePasswords,
  generateToken
};