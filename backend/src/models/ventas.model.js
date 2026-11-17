const pool = require('../config/db');

// Tablas reales: venta(id_venta, fecha, total, id_usuario)
//                detalle_venta(id_detalle_venta, id_venta, id_producto, cantidad, precio_unitario, subtotal)
// Se devuelve una fila por línea de venta con la forma que espera el frontend.
const SELECT = `
  SELECT v.id_venta AS id, d.id_producto AS producto_id, d.cantidad,
         d.precio_unitario, d.subtotal, v.total, v.fecha, v.id_usuario
  FROM venta v
  LEFT JOIN detalle_venta d ON d.id_venta = v.id_venta`;

const getAll = async () => {
  const [rows] = await pool.query(`${SELECT} ORDER BY v.id_venta DESC, d.id_detalle_venta`);
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(`${SELECT} WHERE v.id_venta = ?`, [id]);
  return rows[0];
};

// Registra la venta completa en una transacción:
// venta + detalle_venta + descuento de stock + movimiento_inventario
const create = async ({ producto_id, cantidad, id_usuario }) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [prod] = await conn.query(
      'SELECT precio, stock FROM producto WHERE id_producto = ? FOR UPDATE', [producto_id]
    );
    if (!prod[0]) {
      const e = new Error('Producto no encontrado'); e.status = 404; throw e;
    }
    if (prod[0].stock < cantidad) {
      const e = new Error(`Stock insuficiente (disponible: ${prod[0].stock})`); e.status = 400; throw e;
    }

    const precio = Number(prod[0].precio);
    const subtotal = precio * cantidad;

    const [venta] = await conn.query(
      'INSERT INTO venta (fecha, total, id_usuario) VALUES (NOW(), ?, ?)',
      [subtotal, id_usuario ?? null]
    );
    await conn.query(
      'INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
      [venta.insertId, producto_id, cantidad, precio, subtotal]
    );
    await conn.query('UPDATE producto SET stock = stock - ? WHERE id_producto = ?', [cantidad, producto_id]);
    await conn.query(
      "INSERT INTO movimiento_inventario (fecha, tipo, cantidad, id_producto) VALUES (NOW(), 'salida', ?, ?)",
      [cantidad, producto_id]
    );

    await conn.commit();
    return { id: venta.insertId, producto_id, cantidad, total: subtotal };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

module.exports = { getAll, getById, create };
