const pool = require('../config/db');

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM pagos ORDER BY id DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM pagos WHERE id = ?', [id]
  );
  return rows[0];
};

const create = async ({ venta_id, monto, metodo }) => {
  const [result] = await pool.query(
    'INSERT INTO pagos (venta_id, monto, metodo) VALUES (?, ?, ?)',
    [venta_id, monto, metodo ?? 'efectivo']
  );
  return { id: result.insertId, venta_id, monto, metodo };
};

module.exports = { getAll, getById, create };