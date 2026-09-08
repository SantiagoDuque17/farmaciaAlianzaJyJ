const express = require('express');
const router = express.Router();
const ctrl_ventas = require('../controllers/ventas.controller');

router.get('/', ctrl_ventas.getAll);
router.get('/:id', ctrl_ventas.getById);
router.post('/', ctrl_ventas.create);

module.exports = router;