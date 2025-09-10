const { promocion, Usuario, pedido, promocion_pedido, producto, estado_pedido,factura,promocion_producto } = require("../models");


exports.listar = async (req, res) => {
    try {
        const promos = await promocion.findAll({
        where: { activa: true },
        order: [['fecha_inicio', 'DESC']]
        });
        res.json(promos)
    } catch (error) {
        console.error('Error solicitando categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getpromocionById = async (req, res) => {
    try {
        const { id } = req.params;  
        const promo = await promocion.findByPk(id);
        if (!promo) {
            return res.status(404).json({ error: 'Promoción no encontrada' });
        }
        res.json(promo);
    } catch (error) {
        console.error('Error solicitando promoción por ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getpromocionbyusuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const promos = await promocion.findAll({
            where: { activa: true },
            include: [{
                model: pedido,
                where: { id_usuario },
                required: true,
                attributes: [] // No necesitamos los atributos del pedido
            }],
            order: [['fecha_inicio', 'DESC']]
        });
        res.json(promos)
    } catch (error) {
        console.error('Error solicitando promociones por usuario:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getDescuentosPorUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const descuentos = await pedido.findAll({
      attributes: ['id_pedido', 'fecha_pedido'],
      where: {
        id_usuario: id_usuario
      },
      include: [
        {
          model: promocion,
          through: {
            attributes: ['monto_descuento'], // Atributos de promocion_pedido
            as: 'promocion_pedido'
          },
          attributes: ['nombre_promocion']
        },
        {
          model: factura,
          attributes: ['id_factura']
        },
        {
          model: Usuario,
          attributes: ['nombre', 'apellido']
        }
      ],
      order: [['fecha_pedido', 'DESC']]
    });

    if (descuentos.length === 0) {
      return res.status(404).json({ message: "No hay descuentos aplicados para este usuario" });
      
    }

    // Preparar la información para la vista
    const descuentosInfo = descuentos.map(descuento => ({
      fecha: descuento.pedido.fecha_pedido,
      factura: descuento.pedido.factura.id_factura,
      descuento: descuento.monto_descuento,
      promocion: descuento.promocion.nombre_promocion
    }));

    res.json(descuentosInfo);
  } catch (error) {
    console.error('Error al obtener descuentos por usuario:', error);
    res.status(500).json({ error: 'Error al obtener descuentos por usuario' });
  }
};


exports.getAllPromotionsWithDetails = async (req, res) => {
  try {
    const promotions = await promocion.findAll({
      attributes: ['id_promocion', 'banner_url'],
      include: [
        {
          model: tipo_promocion,
          attributes: ['id_tipo_promo', 'nombre_tipo_promocion']
        },
        {
          model: promocion_producto,
          attributes: [],
          include: {
            model: producto,
            attributes: ['id_producto', 'nombre']
          }
        }
      ],
      order: [['fecha_inicio', 'DESC']]
    });

    if (promotions.length === 0) {
      return res.status(404).json({ message: "No hay promociones disponibles" });
    }

    res.json(promotions);
  } catch (error) {
    console.error('Error al obtener promociones:', error);
    res.status(500).json({ error: 'Error al obtener promociones' });
  }
};


exports.listarPromocionesConDetallesURL = async (req, res) => {
  try {
    // Buscar todas las promociones
    const promociones = await promocion.findAll({
      include: [
        {
          model: producto,
          through: promocion_producto,
          as: 'productos', // Asegúrate de que el alias 'productos' coincida con el alias definido en las asociaciones
          attributes: ['id_producto'], // Solo seleccionamos el id del producto
        }
      ],
      attributes: ['id_promocion', 'id_tipo_promo', 'banner_url'] // Campos que queremos de la promoción
    });

    // Formatear los datos para que cada promoción tenga un array de productos
    const promocionesConDetalles = promociones.map(promocion => ({
      id_promocion: promocion.id_promocion,
      id_tipo_promo: promocion.id_tipo_promo,
      banner_url: promocion.banner_url,
      productos: promocion.productos.map(producto => producto.id_producto)
    }));

    res.json(promocionesConDetalles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las promociones' });
  }
};

