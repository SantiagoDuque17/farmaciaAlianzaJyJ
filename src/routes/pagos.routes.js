const express = require('express');
const router = express.Router();
const ctrlPagos = require('../controllers/pago.controller');
const verifyToken = require('../middleware/auth.middleware');

router.get('/', verifyToken, ctrlPagos.getAll);
router.get('/:id', verifyToken, ctrlPagos.getById);
router.post('/', verifyToken, ctrlPagos.create);

module.exports = router;