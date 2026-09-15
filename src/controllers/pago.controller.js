const PagosModel = require('../models/pagos.model');

// GET /api/productos
const getAll = async (req, res) => {
  try {
    const data = await PagosModel.getAll();
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// GET /api/productos/:id
const getById = async (req, res) => {
  try {
    const data = await PagosModel.getById(req.params.id);
    if (!data) return res.status(404)
      .json({ ok: false, msg: 'pago no encontrado' });
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// POST /api/productos
const create = async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body;
    if (!nombre || !precio)
      return res.status(400).json({ ok: false, msg: 'nombre y precio requeridos' });
    const data = await PagosModel.create({ nombre, precio, stock });
    res.status(201).json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { getAll, getById, create };