const pool = require('../config/db');

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM clientes ORDER BY id DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM clientes WHERE id = ?', [id]
  );
  return rows[0];
};

const create = async ({ nombre, email, telefono }) => {
  const [result] = await pool.query(
    'INSERT INTO clientes (nombre, email, telefono) VALUES (?, ?, ?)',
    [nombre, email, telefono ?? null]
  );
  return { id: result.insertId, nombre, email, telefono };
};

module.exports = { getAll, getById, create };