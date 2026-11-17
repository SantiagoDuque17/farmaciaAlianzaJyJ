const UsuariosModel = require('../models/usuarios.model');

// GET /api/usuarios
const getAll = async (req, res) => {
  try {
    const data = await UsuariosModel.getAll();
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// GET /api/usuarios/:id
const getById = async (req, res) => {
  try {
    const data = await UsuariosModel.getById(req.params.id);
    if (!data) return res.status(404)
      .json({ ok: false, msg: 'Usuario no encontrado' });
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// POST /api/usuarios
const create = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password)
      return res.status(400).json({ ok: false, msg: 'nombre, email y password requeridos' });
    const hashed = require('bcryptjs').hashSync(password, 10);
    const data = await UsuariosModel.create({ nombre, email, password: hashed });
    res.status(201).json({ ok: true, data });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ ok: false, msg: 'Ya existe un usuario con ese correo' });
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { getAll, getById, create };