const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM productos ORDER BY id DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM productos WHERE id = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ nombre, precio, stock }) => {
  const [result] = await pool.query(
    'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
    [nombre, precio, stock ?? 0]
  );
  return { id: result.insertId, nombre, precio, stock };
};

module.exports = { getAll, getById, create };