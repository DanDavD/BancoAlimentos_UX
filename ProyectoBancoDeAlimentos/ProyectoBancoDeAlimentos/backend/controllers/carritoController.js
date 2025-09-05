const { carrito, carrito_detalle, producto,cupon } = require('../models');

exports.agregar = async (req, res) => {
    try {
        const { id_producto, cantidad_unidad_medida } = req.body;
        const id_usuario = req.user.id_usuario;

        const prod = await producto.findByPk(id_producto);
        if (!prod) return res.status(404).json({ msg: 'Producto no existe' });

        let cart = await carrito.findOne({ where: { id_usuario } });
        if (!cart) cart = await carrito.create({ id_usuario });

        const [detail, created] = await carrito_detalle.upsert({
            id_carrito: cart.id_carrito,
            id_producto,
            cantidad_unidad_medida,
            subtotal_detalle: prod.precio_base * cantidad_unidad_medida
        });

        res.json({ msg: created ? 'Agregado' : 'Actualizado', detail });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.verCarrito = async (req, res) => {
    try {
        const id_usuario = req.user.id_usuario;
        const cart = await carrito.findOne({
            where: { id_usuario },
            include: {
                model: carrito_detalle,
                include: { model: producto, attributes: ['id_producto', 'nombre', 'precio_base'] }
            }
        });
        if (!cart) return res.status(404).json({ msg: 'Carrito vacío' });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.sumarItem = async (req, res) => {
    try {
        const { id_producto, cantidad } = req.body;
        const id_usuario = req.user.id_usuario;
        const cart = await carrito.findOne({ where: { id_usuario } });
        if (!cart) return res.status(404).json({ msg: 'Carrito no existe' });

        const detail = await carrito_detalle.findOne({
            where: { id_carrito: cart.id_carrito, id_producto }
        });
        if (!detail) return res.status(404).json({ msg: 'Item no existe' });

        detail.cantidad_unidad_medida += cantidad;
        const prod = await producto.findByPk(id_producto);
        if (!prod) return res.status(404).json({ msg: 'Producto no existe' });
        detail.subtotal_detalle = detail.cantidad_unidad_medida * prod.precio_base;
        await detail.save();
        res.json({ msg: 'Item sumado', detail });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.aplicarCupon = async (req, res) => {
  try {
    const { codigo } = req.body;
    if (!codigo) return res.status(400).json({ msg: 'Código requerido' });

    const id_usuario = req.user.id_usuario;

    const cuponn = await cupon.findOne({ where: { codigo, activo: true } });
    if (!cuponn) return res.status(404).json({ msg: 'Cupón inválido o expirado' });

    const cart = await carrito.findOne({ where: { id_usuario } });
    if (!cart) return res.status(404).json({ msg: 'Carrito no existe' });

    res.json({ msg: 'Cupón aplicado', cuponn });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.eliminarItem = async (req, res) => {
    try {
        const { id_producto } = req.body;
        const id_usuario = req.user.id_usuario;

        const cart = await carrito.findOne({ where: { id_usuario } });
        if (!cart) return res.status(404).json({ msg: 'Carrito no existe' });

        const rows = await carrito_detalle.destroy({
            where: { id_carrito: cart.id_carrito, id_producto }
        });
        if (!rows) return res.status(404).json({ msg: 'Item no encontrado' });

        res.json({ msg: 'Item eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};