const express = require('express');
const router  = express.Router();
const verify  = require('../middleware/verificarToken');
const { carrito, carrito_detalle, producto } = require('../models');

router.post('/agregar', verify, async (req, res) => {
  try {
    const { id_producto, cantidad_unidad_medida } = req.body;
    const id_usuario = req.user.id_usuario;

    const product = await producto.findByPk(id_producto);
    if (!product) return res.status(404).json({ msg: 'producto no existe' });

    let cart = await carrito.findOne({ where: { id_usuario } });
    if (!cart) cart = await carrito.create({ id_usuario });

    const [detail, created] = await carrito_detalle.upsert({
      id_carrito: cart.id_carrito,
      id_producto,
      cantidad_unidad_medida,
      subtotal_detalle: product.precio_base * cantidad_unidad_medida
    });

    res.json({ msg: created ? 'Agregado' : 'Actualizado', detail });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;