const pool = require('../config/db');

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM ventas ORDER BY id DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM ventas WHERE id = ?', [id]
  );
  return rows[0];
};

const create = async ({ producto_id, cantidad }) => {
  const [result] = await pool.query(
    'INSERT INTO ventas (producto_id, cantidad) VALUES (?, ?)',
    [producto_id, cantidad]
  );
  return { id: result.insertId, producto_id, cantidad };
};

module.exports = { getAll, getById, create };