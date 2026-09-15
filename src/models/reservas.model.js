const pool = require('../config/db');

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM reservas ORDER BY id DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM reservas WHERE id = ?', [id]
  );
  return rows[0];
};

const create = async ({ nombre, email, fecha }) => {
  const [result] = await pool.query(
    'INSERT INTO reservas (nombre, email, fecha) VALUES (?, ?, ?)',
    [nombre, email, fecha ?? null]
  );
  return { id: result.insertId, nombre, email, fecha };
};

module.exports = { getAll, getById, create };