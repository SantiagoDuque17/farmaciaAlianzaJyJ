require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// CORS: permite al frontend (otro origen) llamar a la API.
// Orígenes permitidos en CORS_ORIGIN (separados por coma).
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',').map(o => o.trim().replace(/\/$/, '')).filter(Boolean); // sin barra final
app.use(cors({ origin: allowedOrigins }));

// Ruta de salud (Render / pruebas rápidas)
app.get('/', (req, res) => res.json({ ok: true, msg: 'API Farmacia Alianza JyJ' }));

// Middleware para parsear JSON
app.use(express.json());

// 1. Importar rutas de Autenticación
const authRouter = require('./routes/auth.routes');

const productosRouter = require('./routes/productos.routes');
const usuariosRouter = require('./routes/usuarios.routes');
const ventasRouter = require('./routes/ventas.routes');
const clientesRouter = require('./routes/clientes.routes');

// 2. Montar ruta base /api/auth
app.use('/api/auth', authRouter);

app.use('/api/productos', productosRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/ventas', ventasRouter);

module.exports = app;