const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Ruta 
const productosRouter = require('./routes/productos.routes');
app.use('/api/productos', productosRouter);

// ruta - pagos
const productosRouter = require('./routes/pagos.routes');
app.use('/api/pagos', pagosRouter);

//ruta - clientes
const productosRouter = require('./routes/clientes.routes');
app.use('/api/clientes', clientesRouter);



module.exports = app;