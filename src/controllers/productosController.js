const db = require('../config/db');

// GET /api/productos  (pública)
const getAll = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos ORDER BY id DESC');
    res.json(rows);
  } catch (err) { next(err); }
};

// GET /api/productos/:id  (pública)
const getById = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(rows[0]);
  } catch (err) { next(err); }
};

// POST /api/productos  (protegida)
const create = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    if (!nombre || precio === undefined) {
      return res.status(400).json({ error: 'nombre y precio son obligatorios' });
    }
    const [result] = await db.query(
      'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)',
      [nombre, descripcion || null, precio, stock || 0]
    );
    res.status(201).json({ id: result.insertId, nombre, descripcion, precio, stock: stock || 0 });
  } catch (err) { next(err); }
};

// PUT /api/productos/:id  (protegida)
const update = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    const [result] = await db.query(
      `UPDATE productos
       SET nombre = COALESCE(?, nombre),
           descripcion = COALESCE(?, descripcion),
           precio = COALESCE(?, precio),
           stock = COALESCE(?, stock)
       WHERE id = ?`,
      [nombre ?? null, descripcion ?? null, precio ?? null, stock ?? null, req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto actualizado' });
  } catch (err) { next(err); }
};

// DELETE /api/productos/:id  (protegida)
const remove = async (req, res, next) => {
  try {
    const [result] = await db.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto eliminado' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, remove };