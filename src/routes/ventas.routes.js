const express = require('express');
const router = express.Router();
const ctrl_ventas = require('../controllers/ventas.controller');
const verifyToken = require('../middleware/auth.middleware');


router.get('/', verifyToken, ctrl_ventas.getAll);
router.get('/:id', verifyToken, ctrl_ventas.getById);
router.post('/', verifyToken, ctrl_ventas.create);

module.exports = router;