const express = require('express');
const router = express.Router();
const ctrlreservas = require('../controllers/reservas.controller');

router.get('/', ctrlreservas.getAll);
router.get('/:id', ctrlreservas.getById);
router.post('/', ctrlreservas.create);

module.exports = router;