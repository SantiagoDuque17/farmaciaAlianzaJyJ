const pool = require('../config/db');

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT id, nombre, email FROM usuarios ORDER BY id DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT id, nombre, email FROM usuarios WHERE id = ?', [id]
  );
  return rows[0];
};

const create = async ({ nombre, email, password }) => {
  const [result] = await pool.query(
    'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
    [nombre, email, password]
  );
  return { id: result.insertId, nombre, email };
};

module.exports = { getAll, getById, create };