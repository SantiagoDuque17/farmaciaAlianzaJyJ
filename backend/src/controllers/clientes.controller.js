const ClienteModel = require('../models/clientes.model');

// GET /api/clientes
const getAll = async (req, res) => {
  try {
    const data = await ClienteModel.getAll();
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// GET /api/clientes/:id
const getById = async (req, res) => {
  try {
    const data = await ClienteModel.getById(req.params.id);
    if (!data) return res.status(404)
      .json({ ok: false, msg: 'Cliente no encontrado' });
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// POST /api/clientes
const create = async (req, res) => {
  try {
    const { nombre, telefono } = req.body;
    if (!nombre)
      return res.status(400).json({ ok: false, msg: 'nombre requerido' });
    const data = await ClienteModel.create({ nombre, telefono });
    res.status(201).json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { getAll, getById, create };