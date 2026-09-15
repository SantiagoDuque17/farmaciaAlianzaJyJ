const express = require('express');
const router = express.Router();
const ctrlClientes = require('../controllers/clientes.controller');

router.get('/', ctrlClientes.getAll);
router.get('/:id', ctrlClientes.getById);
router.post('/', ctrlClientes.create);

module.exports = router;