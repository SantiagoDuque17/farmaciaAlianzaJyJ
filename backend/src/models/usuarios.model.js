const pool = require('../config/db');

// Tabla real: usuario(id_usuario, nombre, correo, contrasena, rol)
// Se devuelven alias (id, email) para que el frontend no cambie.
const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT id_usuario AS id, nombre, correo AS email, rol FROM usuario ORDER BY id_usuario DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT id_usuario AS id, nombre, correo AS email, rol FROM usuario WHERE id_usuario = ?', [id]
  );
  return rows[0];
};

// Incluye la contraseña guardada -> solo para uso interno del login
const getByEmail = async (email) => {
  const [rows] = await pool.query(
    'SELECT id_usuario AS id, nombre, correo AS email, contrasena AS password, rol FROM usuario WHERE correo = ?',
    [email]
  );
  return rows[0];
};

const updatePassword = async (id, hash) => {
  await pool.query('UPDATE usuario SET contrasena = ? WHERE id_usuario = ?', [hash, id]);
};

const create = async ({ nombre, email, password, rol = 'vendedor' }) => {
  const [result] = await pool.query(
    'INSERT INTO usuario (nombre, correo, contrasena, rol) VALUES (?, ?, ?, ?)',
    [nombre, email, password, rol]
  );
  return { id: result.insertId, nombre, email, rol };
};

module.exports = { getAll, getById, getByEmail, updatePassword, create };
