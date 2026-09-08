const express = require('express');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
const productosRouter = require('./routes/productos.routes');
const usuariosRouter = require('./routes/usuarios.routes');
const reservasRouter = require('./routes/reservas.routes');

app.use('/api/productos', productosRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/reservas', reservasRouter);

module.exports = app;