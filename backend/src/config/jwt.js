require('dotenv').config();
// Secreto único para firmar (login) y verificar (middleware) los tokens JWT.
// Se define en .env como JWT_SECRET.
module.exports = {
  secret: process.env.JWT_SECRET || 'secret_key_farmacia',
  expiresIn: '24h',
};
