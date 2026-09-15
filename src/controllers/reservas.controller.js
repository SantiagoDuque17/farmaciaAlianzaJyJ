const ReservasModel = require('../models/reservas.model');

// GET /api/reservas
const getAll = async (req, res) => {
  try {
    const data = await ReservasModel.getAll();
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// GET /api/reservas/:id
const getById = async (req, res) => {
  try {
    const data = await ReservasModel.getById(req.params.id);
    if (!data) return res.status(404)
      .json({ ok: false, msg: 'Reserva no encontrada' });
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// POST /api/reservas
const create = async (req, res) => {
  try {
    const { nombre, email, fecha } = req.body;
    if (!nombre || !email)
      return res.status(400).json({ ok: false, msg: 'nombre y email requeridos' });
    const data = await ReservasModel.create({ nombre, email, fecha });
    res.status(201).json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { getAll, getById, create };