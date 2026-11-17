const express = require('express');
const router = express.Router();
const ctrlClientes = require('../controllers/clientes.controller');
const verifyToken = require('../middleware/auth.middleware');

router.get('/', verifyToken, ctrlClientes.getAll);
router.get('/:id', verifyToken, ctrlClientes.getById);
router.post('/', verifyToken, ctrlClientes.create);

module.exports = router;