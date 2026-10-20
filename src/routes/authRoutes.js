const router = require('express').Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const ctrl = require('../controllers/authController');

// Públicas
router.post('/register', ctrl.register);
router.post('/login', ctrl.login);

// Protegidas
router.get('/perfil', verificarToken, ctrl.perfil);
router.put('/cambiar-password', verificarToken, ctrl.cambiarPassword);

module.exports = router;