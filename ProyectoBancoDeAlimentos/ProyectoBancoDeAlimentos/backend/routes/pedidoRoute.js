const express = require('express');
const router = express.Router();

const pedidoController = require('../controllers/pedidoController');

router.get('/get-pedido/:id_usuario', pedidoController.getPedidosEntregados);
router.get('/get-historial', pedidoController.getHistorialComprasProductos);
router.post('/crear-pedido', pedidoController.crearPedido);

module.exports = router;