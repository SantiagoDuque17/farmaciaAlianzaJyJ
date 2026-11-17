const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UsuariosModel = require('../models/usuarios.model');
const jwtConfig = require('../config/jwt');

// La base trae contraseñas en 3 formatos: bcrypt ($2y$/$2a$/$2b$), SHA-256 (64 hex) y texto plano.
// Se verifica según el formato y, si no era bcrypt, se migra a bcrypt tras un login correcto.
const safeEqual = (a, b) => {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

const checkPassword = (plain, stored) => {
  if (!stored) return { valid: false };
  if (/^\$2[aby]\$/.test(stored)) return { valid: bcrypt.compareSync(plain, stored), legacy: false };
  if (/^[a-f0-9]{64}$/i.test(stored)) {
    const sha = crypto.createHash('sha256').update(plain).digest('hex');
    return { valid: safeEqual(sha, stored.toLowerCase()), legacy: true };
  }
  return { valid: safeEqual(plain, stored), legacy: true };
};

const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
      return res.status(400).json({ ok: false, msg: 'nombre, email y password son requeridos' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await UsuariosModel.create({ nombre, email, password: hashedPassword });

    res.status(201).json({
      ok: true,
      msg: 'Usuario registrado exitosamente',
      data: { id: user.id, nombre: user.nombre, email: user.email }
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ ok: false, msg: 'Ya existe un usuario con ese correo' });
    }
    res.status(500).json({ ok: false, msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ ok: false, msg: 'email y password son requeridos' });
    }

    // Verificar credenciales contra la base de datos
    const user = await UsuariosModel.getByEmail(email);
    const check = user ? checkPassword(password, user.password) : { valid: false };
    if (!check.valid) {
      return res.status(401).json({ ok: false, msg: 'Correo o contraseña incorrectos' });
    }

    if (check.legacy) {
      await UsuariosModel.updatePassword(user.id, bcrypt.hashSync(password, 10)).catch(() => {});
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    res.json({
      ok: true,
      token,
      user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol },
    });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
};

module.exports = { register, login };