const VentasModel = require('../models/ventas.model');

// GET /api/ventas
const getAll = async (req, res) => {
  try {
    const data = await VentasModel.getAll();
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// GET /api/ventas/:id
const getById = async (req, res) => {
  try {
    const data = await VentasModel.getById(req.params.id);
    if (!data) return res.status(404)
      .json({ ok: false, msg: 'Venta no encontrada' });
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// POST /api/ventas
const create = async (req, res) => {
  try {
    const { producto_id, cantidad } = req.body;
    if (!producto_id || !cantidad)
      return res.status(400).json({ ok: false, msg: 'producto_id y cantidad requeridos' });
    const data = await VentasModel.create({ producto_id, cantidad });
    res.status(201).json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { getAll, getById, create };