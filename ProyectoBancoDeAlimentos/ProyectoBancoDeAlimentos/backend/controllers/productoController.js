const { producto, imagen_producto } = require('../models');

exports.destacados = async (req, res) => {
  try {
    const products = await producto.findAll({
      where: { activo: true },
      attributes: [
        'id_producto',
        'nombre',
        'descripcion',
        'precio_base',
        'unidad_medida',
        'estrellas'
      ],
      include: [
        { model: imagen_producto, attributes: ['url_imagen'], limit: 1 }
      ],
      order: [['id_producto', 'DESC']],
      limit: 10
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.tendencias = async (req, res) => {
  try {
    const products = await producto.findAll({
      where: { activo: true },
      attributes: [
        'id_producto',
        'nombre',
        'descripcion',
        'precio_base',
        'estrellas'
      ],
      include: [
        { model: imagen_producto, attributes: ['url_imagen'], limit: 1 }
      ],
      order: [['precio_base', 'DESC']],
      limit: 10
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};