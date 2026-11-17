const router = require('express').Router();
const ctrl = require('../controllers/productos.controller');
const verifyToken = require('../middleware/auth.middleware');

// Rutas PÚBLICAS
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);

// Rutas PROTEGIDAS (requieren token válido)
router.post('/', verifyToken, ctrl.create);

module.exports = router;