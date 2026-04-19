const express = require('express');
const router = express.Router();

const controller = require('../controllers/productos.controller.js')
router.get('/', controller.productos_get);
router.get('/:id', controller.producto_id_get);

module.exports = router;
