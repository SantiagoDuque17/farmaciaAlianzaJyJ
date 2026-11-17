const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    
    if (!token) {
        return res.status(403).json({ message: "Token no proporcionado" });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), jwtConfig.secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};

module.exports = verifyToken;