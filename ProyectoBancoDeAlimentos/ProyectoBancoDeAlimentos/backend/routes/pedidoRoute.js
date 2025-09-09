const express = require('express');
const router = express.Router();

const pedidoController = require('../controllers/pedidoController');

router.post('/get-pedido/:id_usuario', pedidoController.getPedidosEntregados);

module.exports = router;