const express = require('express');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Ruta - productos
const productosRouter = require('./routes/productos.routes');
app.use('/api/productos', productosRouter);

// Ruta - pagos
const pagosRouter = require('./routes/pagos.routes');
app.use('/api/pagos', pagosRouter);

// Ruta - clientes
const clientesRouter = require('./routes/clientes.routes');
app.use('/api/clientes', clientesRouter);

// Ruta - ventas
const ventasRouter = require('./routes/ventas.routes');
app.use('/api/ventas', ventasRouter);

module.exports = app;