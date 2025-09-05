// backend/controllers/productoController.js
const { producto, imagen_producto } = require('../models');

// Productos destacados (últimos creados) con 1 imagen
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
        {
          model: imagen_producto,
          attributes: ['url_imagen'],
          limit: 1,
          separate: true,          // asegura que el limit funcione por asociación
          order: [['orden_imagen', 'ASC']]
        }
      ],
      order: [['id_producto', 'DESC']],
      limit: 10
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tendencias (mayor precio) con 1 imagen
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
        {
          model: imagen_producto,
          attributes: ['url_imagen'],
          limit: 1,
          separate: true,
          order: [['orden_imagen', 'ASC']]
        }
      ],
      order: [['precio_base', 'DESC']],
      limit: 10
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todos (todas las imágenes)
exports.listarProductos = async (req, res) => {
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
        { model: imagen_producto, attributes: ['url_imagen', 'orden_imagen'] }
      ],
      order: [['id_producto', 'DESC']]
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener por id (todas las imágenes)
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await producto.findOne({
      where: { id_producto: id, activo: true },
      attributes: [
        'id_producto',
        'nombre',
        'descripcion',
        'precio_base',
        'unidad_medida',
        'estrellas'
      ],
      include: [
        { model: imagen_producto, attributes: ['url_imagen', 'orden_imagen'] }
      ]
    });
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear producto con imágenes
exports.addproducto = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      precio_base,
      id_subcategoria,
      id_marca,
      unidad_medida,
      estrellas,
      imagenes
    } = req.body;

    const prod = await producto.create({
      nombre,
      descripcion,
      precio_base,
      id_subcategoria,
      id_marca,
      unidad_medida,
      estrellas: estrellas || 0,
      activo: true
    });

    if (Array.isArray(imagenes) && imagenes.length) {
      const imgs = imagenes.map(img => ({
        id_producto: prod.id_producto,
        url_imagen: img.url_imagen,
        orden_imagen: img.orden_imagen ?? 0
      }));
      await imagen_producto.bulkCreate(imgs);
    }

    const result = await producto.findByPk(prod.id_producto, {
      include: [{ model: imagen_producto, attributes: ['url_imagen', 'orden_imagen'] }]
    });

    res.status(201).json({ msg: 'Producto creado', producto: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Solo imágenes de un producto
exports.imagenesProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const images = await imagen_producto.findAll({
      where: { id_producto: id },
      attributes: ['id_imagen', 'url_imagen', 'orden_imagen'],
      order: [['orden_imagen', 'ASC']]
    });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
