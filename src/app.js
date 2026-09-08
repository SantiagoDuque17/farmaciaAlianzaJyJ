const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
const productosRouter = require('./routes/productos.routes');
app.use('/api/productos', productosRouter);

const ventasRouter = require('./routes/ventas.routes');
app.use('/api/ventas', ventasRouter);

module.exports = app;