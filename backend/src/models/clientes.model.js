const pool = require('../config/db');

// Tabla real: cliente(id_cliente, nombre, telefono)
const COLS = 'id_cliente AS id, nombre, telefono';

const getAll = async () => {
  const [rows] = await pool.query(`SELECT ${COLS} FROM cliente ORDER BY id_cliente DESC`);
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(`SELECT ${COLS} FROM cliente WHERE id_cliente = ?`, [id]);
  return rows[0];
};

const create = async ({ nombre, telefono }) => {
  const [result] = await pool.query(
    'INSERT INTO cliente (nombre, telefono) VALUES (?, ?)',
    [nombre, telefono ?? null]
  );
  return { id: result.insertId, nombre, telefono: telefono ?? null };
};

module.exports = { getAll, getById, create };
