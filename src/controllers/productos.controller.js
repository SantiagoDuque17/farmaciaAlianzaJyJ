const ProductoModel = require('../models/productos.model');

const getAll = async (req, res) => {
  try {
    const data = await ProductoModel.getAll();
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await ProductoModel.getById(req.params.id);
    if (!data) return res.status(404).json({ ok: false, msg: 'Producto no encontrado' });
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body;
    if (!nombre || !precio) {
      return res.status(400).json({ ok: false, msg: 'Nombre y precio son requeridos' });
    }
    const data = await ProductoModel.create({ nombre, precio, stock });
    res.status(201).json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ProductoModel.update(id, req.body);
    
    if (!data) return res.status(404).json({ ok: false, msg: 'Producto no encontrado para actualizar' });
    
    res.json({ ok: true, msg: 'Producto actualizado con éxito', data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await ProductoModel.delete(id);
    
    if (!eliminado) return res.status(404).json({ ok: false, msg: 'Producto no encontrado para eliminar' });
    
    res.json({ ok: true, msg: 'Producto eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };