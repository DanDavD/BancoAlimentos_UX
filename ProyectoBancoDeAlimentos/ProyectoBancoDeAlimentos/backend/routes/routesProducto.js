const express = require('express');
const router  = express.Router();
const productoCtrl = require('../controllers/productoController');
const verificarToken = require('../middleware/verificarToken'); // si quieres proteger con JWT

router.get('/destacados', productoCtrl.destacados);
router.get('/tendencias', productoCtrl.tendencias);
router.get('/', verificarToken, productoCtrl.listarProductos);
router.get('/:id', verificarToken, productoCtrl.obtenerProductoPorId);

router.post('/', verificarToken, productoCtrl.addproducto);

router.get('/:id/imagenes', verificarToken, productoCtrl.imagenesProducto);



module.exports = router;