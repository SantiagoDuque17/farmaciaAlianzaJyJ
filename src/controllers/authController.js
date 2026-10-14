const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Genera el token con id, email y rol en el payload (nunca la contraseña)
const generarToken = (usuario) =>
  jwt.sign(
    { id: usuario.id, email: usuario.email, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'nombre, email y password son obligatorios' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener mínimo 6 caracteres' });
    }

    // 1. Verificar si ya existe
    const [rows] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (rows.length) {
      return res.status(409).json({ error: 'Email ya registrado' });
    }

    // 2. Hashear la contraseña con bcrypt (saltRounds = 10)
    const hash = await bcrypt.hash(password, 10);

    // 3. Guardar en la base de datos
    const [result] = await db.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, hash]
    );

    // 4. Generar token y responder
    const token = generarToken({ id: result.insertId, email, rol: 'cliente' });
    res.status(201).json({
      mensaje: 'Usuario registrado',
      token,
      usuario: { id: result.insertId, nombre, email, rol: 'cliente' }
    });
  } catch (err) { next(err); }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email y password son obligatorios' });
    }

    // 1. Buscar usuario por email
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    const usuario = rows[0];
    // Mismo mensaje si el email o la contraseña fallan
    if (!usuario) return res.status(401).json({ error: 'Credenciales inválidas' });

    // 2. Comparar contraseña con bcrypt
    const valid = await bcrypt.compare(password, usuario.password);
    if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });

    // 3. Firmar token y devolverlo
    const token = generarToken(usuario);
    res.json({
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol }
    });
  } catch (err) { next(err); }
};

// GET /api/auth/perfil  (protegida)
const perfil = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      'SELECT id, nombre, email, rol, creado_en FROM usuarios WHERE id = ?',
      [req.usuario.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (err) { next(err); }
};

// PUT /api/auth/cambiar-password  (protegida)
const cambiarPassword = async (req, res, next) => {
  try {
    const { passwordActual, passwordNueva } = req.body;
    if (!passwordActual || !passwordNueva || passwordNueva.length < 6) {
      return res.status(400).json({ error: 'Datos inválidos (nueva contraseña mínimo 6 caracteres)' });
    }

    const [rows] = await db.query('SELECT password FROM usuarios WHERE id = ?', [req.usuario.id]);
    if (!rows.length) return res.status(404).json({ error: 'Usuario no encontrado' });

    const ok = await bcrypt.compare(passwordActual, rows[0].password);
    if (!ok) return res.status(401).json({ error: 'La contraseña actual es incorrecta' });

    const hash = await bcrypt.hash(passwordNueva, 10);
    await db.query('UPDATE usuarios SET password = ? WHERE id = ?', [hash, req.usuario.id]);
    res.json({ mensaje: 'Contraseña actualizada' });
  } catch (err) { next(err); }
};

module.exports = { register, login, perfil, cambiarPassword };