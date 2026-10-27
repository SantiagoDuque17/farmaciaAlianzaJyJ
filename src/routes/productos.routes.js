const router = require('express').Router();
const ctrl = require('../controllers/productos.controller');
const verificarToken = require('../middleware/auth.middleware');

// Rutas PÚBLICAS
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);

// Rutas PROTEGIDAS (requieren token válido)
router.post('/', verificarToken, ctrl.create);
router.put('/:id', verificarToken, ctrl.update);
router.delete('/:id', verificarToken, ctrl.remove);

module.exports = router;