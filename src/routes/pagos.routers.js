const express = require('express');
const router = express.Router();
const ctrlPagos = require('../controllers/pagos.controller');

router.get('/', ctrlPagos.getAll);
router.get('/:id', ctrlPagos.getById);
router.post('/', ctrlPagos.create);

module.exports = router;