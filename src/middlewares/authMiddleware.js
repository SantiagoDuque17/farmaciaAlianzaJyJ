const jwt = require('jsonwebtoken');

// Verifica el token: 401 si no hay, 403 si es inválido o expiró
const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Adjuntar datos del usuario al request
    next();                // Token válido: continuar
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

// Control por rol (se usa DESPUÉS de verificarToken)
const verificarRol = (...rolesPermitidos) => (req, res, next) => {
  if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
    return res.status(403).json({ error: 'No tienes permisos para esta acción' });
  }
  next();
};

module.exports = { verificarToken, verificarRol };
