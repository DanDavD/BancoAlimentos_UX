const express = require('express');
const router  = express.Router();
const productoCtrl = require('../controllers/productoController');
const verificarToken = require('../middleware/verificarToken'); // si quieres proteger con JWT
router.get('/recomendados', productoCtrl.productosRecomendados);
router.get('/destacados', productoCtrl.destacados);
router.get('/tendencias', productoCtrl.tendencias);
router.get('/porcentaje-ganancia', productoCtrl.getAllPorcentajeGanancia);

router.post('/', verificarToken, productoCtrl.addproducto);
router.get('/', verificarToken, productoCtrl.listarProductos);
router.put('/:id/porcentaje-ganancia', productoCtrl.putPorcentajeGanancia);

router.get('/:id', verificarToken, productoCtrl.obtenerProductoPorId);
router.get('/:id/imagenes', verificarToken, productoCtrl.imagenesProducto);

router.patch('/desactivar/:id_producto', productoCtrl.desactivarProducto);
router.put('/actualizar-producto/:id_producto', productoCtrl.actualizarProducto);


module.exports = router;