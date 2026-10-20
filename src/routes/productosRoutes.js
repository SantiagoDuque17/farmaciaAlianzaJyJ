const router = require('express').Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const ctrl = require('../controllers/productosController');

// Rutas PÚBLICAS
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);

// Rutas PROTEGIDAS (requieren token válido)
router.post('/', verificarToken, ctrl.create);
router.put('/:id', verificarToken, ctrl.update);
router.delete('/:id', verificarToken, ctrl.remove);

module.exports = router;