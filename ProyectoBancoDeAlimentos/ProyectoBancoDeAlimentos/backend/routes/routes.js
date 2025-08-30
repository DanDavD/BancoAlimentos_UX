const express = require('express');
const router = express.Router();

router.use('/auth', require('./routesLogin'));          // /api/auth/...
router.use('/prueba', require('./prueba'));             // /api/prueba/...
router.use('/dashboard', require('./routesInicioUsuario')); // /api/dashboard/...
router.use('/Inventario', require('./routesInventario'));
router.use('/MiPerfil', require('./routesMiPerfil'));
router.use('/categorias', require('./routesCategoria'));
router.use('/test', require('./test'));
router.use('/forget-password', require('./forgetPassword'));
router.use('/validar-codigo', require('./validarCodigo'));

module.exports = router;
