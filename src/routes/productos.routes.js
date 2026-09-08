const express = require('express');
const router = express.Router();
const ctrlProductos = require('../controllers/productos.controller');

router.get('/', ctrlProductos.getAll);
router.get('/:id', ctrlProductos.getById);
router.post('/', ctrlProductos.create);

module.exports = router;