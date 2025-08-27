const express = require('express');
const router = express.Router();


const authRoutes = require('./routesLogin');
const prueba_rutas = require('./prueba');

router.use('/auth', authRoutes);
router.use('/prueba',prueba_rutas);


//rutas de modules
router.use("/categorias", require("./categoria"));
router.use("/subcategorias", require("./subcategoria"));
router.use("/productos", require("./producto"));
router.use("/imagen-productos", require("./imagen_producto"));
router.use("/valoracion-productos", require("./valoracion_producto"));
router.use("/marcas", require("./marca_producto"));
router.use("/sucursales", require("./sucursal"));
router.use("/sucursal-productos", require("./sucursal_producto"));
router.use("/carritos", require("./carrito"));
router.use("/carrito-detalles", require("./carrito_detalle"));
router.use("/departamentos", require("./departamento"));
router.use("/municipios", require("./municipio"));
router.use("/direcciones", require("./direccion"));

module.exports = router;
