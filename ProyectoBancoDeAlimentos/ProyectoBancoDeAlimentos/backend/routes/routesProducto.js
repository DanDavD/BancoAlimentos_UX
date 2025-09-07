const express = require('express');
const router  = express.Router();
const productoCtrl = require('../controllers/productoController');
const verificarToken = require('../middleware/verificarToken'); // si quieres proteger con JWT

router.get('/destacados', productoCtrl.destacados);
router.get('/tendencias', productoCtrl.tendencias);
router.get('/', productoCtrl.listarProductos);
router.get('/:id', productoCtrl.obtenerProductoPorId);

router.post('/', verificarToken, productoCtrl.addproducto);

router.get('/:id/imagenes', productoCtrl.imagenesProducto);



module.exports = router;