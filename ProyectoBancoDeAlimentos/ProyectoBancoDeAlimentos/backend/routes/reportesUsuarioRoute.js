const express = require('express');
const router = express.Router();

const reportesUsuarioController = require('../controllers/reportesUsuarioController');
const { route } = require('./routesFactura');

router.get('/top-3-productos', reportesUsuarioController.getTopProductosUsuario);
router.get('/top-3-recomendados', reportesUsuarioController.getProductosRecomendados);
router.get('/top-dias-pedidos',reportesUsuarioController.getDiasCompra);
router.get('/total-ahorrado',reportesUsuarioController.getTotalAhorrado);

module.exports = router;