// ackend/controllers/productoController.js
const { producto, imagen_producto,categoria, subcategoria} = require('../models');

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

// PUT /api/productos/:id/porcentaje-ganancia
exports.putPorcentajeGanancia = async (req, res) => {
  try {
    const { porcentaje_ganancia } = req.body;
    if (porcentaje_ganancia === undefined || porcentaje_ganancia < 0)
      return res.status(400).json({ msg: 'porcentaje_ganancia debe ser >= 0' });

    const [rows] = await producto.update(
      { porcentaje_ganancia },
      { where: { id_producto: req.params.id } }
    );
    if (!rows) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json({ msg: 'Margen actualizado', porcentaje_ganancia });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/productos/porcentaje-ganancia
exports.getAllPorcentajeGanancia = async (_req, res) => {
  try {
    const cats = await categoria.findAll({
      attributes: ["id_categoria", "nombre", "PorcentajeDeGananciaMinimo"]
    });
    return res.json(cats);
  } catch (err) {
    console.error("GetAllPorcentajeDeGananciasEnCategoria error:", err);
    return res.status(500).json({ error: "No se pudieron obtener los porcentajes." });
  }
};

exports.productosRecomendados = async (req, res) => {
  try {
    const products = await producto.findAll({
      where: { activo: true },
      attributes: [
        'id_producto',
        'nombre',
        'descripcion',
        'precio_base',
        'unidad_medida',
        'estrellas',
        'id_subcategoria'
      ],
      include: [
        {
          model: imagen_producto,
          as: 'imagenes',                 
          attributes: ['url_imagen'],
          limit: 1,                       
          separate: true,                 
          order: [['orden_imagen', 'ASC']]
        }
      ],
      order: [['estrellas', 'DESC'], ['id_producto', 'DESC']],
      
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



