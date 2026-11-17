const pool = require('../config/db');

// Tabla real: producto(id_producto, nombre, precio, stock)
const COLS = 'id_producto AS id, nombre, precio, stock';

const getAll = async () => {
  const [rows] = await pool.query(`SELECT ${COLS} FROM producto ORDER BY id_producto DESC`);
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(`SELECT ${COLS} FROM producto WHERE id_producto = ?`, [id]);
  return rows[0];
};

const create = async ({ nombre, precio, stock }) => {
  const [result] = await pool.query(
    'INSERT INTO producto (nombre, precio, stock) VALUES (?, ?, ?)',
    [nombre, precio, stock ?? 0]
  );
  return { id: result.insertId, nombre, precio, stock: stock ?? 0 };
};

module.exports = { getAll, getById, create };
