const express = require('express');
const router = express.Router();
const ctrlusuarios = require('../controllers/usuarios.controller');
const verifyToken = require('../middleware/auth.middleware');

router.get('/', verifyToken, ctrlusuarios.getAll);
router.get('/:id', verifyToken, ctrlusuarios.getById);
router.post('/', verifyToken, ctrlusuarios.create);

module.exports = router;