const express = require('express');
const router = express.Router();
const ctrlreservas = require('../controllers/reservas.controller');
const verifyToken = require('../middleware/auth.middleware');

router.get('/', verifyToken, ctrlreservas.getAll);
router.get('/:id', verifyToken, ctrlreservas.getById);
router.post('/', verifyToken, ctrlreservas.create);

module.exports = router;