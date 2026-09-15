const express = require('express');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

const productosRouter = require('./routes/productos.routes');
const usuariosRouter = require('./routes/usuarios.routes');
const reservasRouter = require('./routes/reservas.routes');
const pagosRouter = require('./routes/pagos.routes');
const ventasRouter = require('./routes/ventas.routes');
const clientesRouter = require('./routes/clientes.routes');

app.use('/api/productos', productosRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/reservas', reservasRouter);
app.use('/api/pagos', pagosRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/ventas', ventasRouter);

module.exports = app;