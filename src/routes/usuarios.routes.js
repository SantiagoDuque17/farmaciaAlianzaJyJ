const express = require('express');
const router = express.Router();
const ctrlusuarios = require('../controllers/usuarios.controller');

router.get('/', ctrlusuarios.getAll);
router.get('/:id', ctrlusuarios.getById);
router.post('/', ctrlusuarios.create);

module.exports = router;