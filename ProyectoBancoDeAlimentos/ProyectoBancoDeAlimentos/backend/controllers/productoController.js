const { producto, imagen_producto, categoria, subcategoria, marca_producto  } = require('../models');

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
        'estrellas',
        'etiquetas'
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
        'estrellas',
        'etiquetas'

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

exports.listarProductos = async (req, res) => {
  try {
    const products = await producto.findAll({
      where: { activo: true },
      attributes: [
        'id_producto', 'nombre', 'descripcion', 'precio_base',
        'unidad_medida', 'estrellas', 'etiquetas', 'porcentaje_ganancia'
      ],
      include: [
        { 
          model: imagen_producto, 
          as: 'imagenes', 
          attributes: ['url_imagen', 'orden_imagen'] 
        },
        {
          model: subcategoria, 
          as: 'subcategoria',
          attributes: ['id_subcategoria', 'nombre', 'id_categoria_padre'],
          include: [{ 
            model: categoria, 
            as: 'categoria', 
            attributes: ['id_categoria', 'nombre', 'icono_categoria'] 
          }]
        },
        { 
          model: marca_producto, 
          as: 'marca', 
          attributes: ['id_marca_producto', 'nombre'] 
        }
      ],
      order: [['id_producto', 'DESC']]
    });

    // Si no hay asociación de stock, podrías necesitar una consulta separada
    const productsWithCalculations = products.map(product => {
      const productJSON = product.toJSON();
      
      // Calcular precio de venta
      const precioBase = parseFloat(productJSON.precio_base) || 0;
      const porcentajeGanancia = parseFloat(productJSON.porcentaje_ganancia) || 0;
      const precioVenta = precioBase * (1 + porcentajeGanancia / 100);

      return {
        ...productJSON,
        stock_total: 0, // Valor temporal, necesitarías implementar la lógica de stock
        precio_venta: precioVenta.toFixed(2),
        categoria: productJSON.subcategoria?.categoria || null
      };
    });

    return res.status(200).json(productsWithCalculations);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  };
};

exports.listarMarcas = async (req, res) => {
  try {
    const marcas = await marca_producto.findAll({
      attributes: ['id_marca_producto', 'nombre']
    });
    res.json(marcas);
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
        'estrellas',
        'etiquetas'
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
        'etiquetas',
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
// PATCH /api/producto/desactivar/:id_producto

exports.desactivarProducto = async (req, res) => {
  try {
    const { id_producto } = req.params; // <-- Corrige req.params para obtener el ID del producto

    const product = await producto.findByPk(id_producto);

    if (!product) {
      return res.status(404).json({ message: "No se pudo encontrar el producto!" });
    }

    if (!product.activo) {
      return res.status(400).json({ message: "El producto ya está inactivo" });
    }

    product.activo = false;

    await product.save();
    return res.status(200).json({ message: "Producto desactivado correctamente!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al borrar producto!" });
  }
};
//PUT /api/producto/actualizar-producto/:id_producto
exports.actualizarProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio_base, id_subcategoria, porcentaje_ganancia, id_marca, etiquetas, unidad_medida, activo } = req.body;
    const { id_producto } = req.params;

    const product = await producto.findByPk(id_producto);
    if (!product) {
      return res.status(404).json({ message: "No se pudo encontrar el producto!" });
    }
    const cat = await categoria.findOne({
      include: [{ model: subcategoria, where: { id_subcategoria } }]
    });

    const subcat = await subcategoria.findByPk(id_subcategoria);
    if (!subcat) {
      return res.status(400).json({ message: "La subcategoría no existe!" });
    }

    const marcaz = await marca_producto.findByPk(id_marca);
    if (!marcaz) {
      return res.status(400).json({ message: "La marca no existe!" });
    }

    product.nombre = nombre;
    product.descripcion = descripcion;
    product.precio_base = precio_base;
    product.cat = cat;
    product.unidad_medida = unidad_medida;
    product.id_subcategoria = id_subcategoria;
    product.porcentaje_ganancia = porcentaje_ganancia;
    product.id_marca = id_marca;
    product.etiquetas = etiquetas;
    product.activo = activo;

    await product.save();

    return res.json({
      message: "Producto actualizado correctamente",
      product
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar producto!" });
  }
};