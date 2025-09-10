const { promocion, Usuario, pedido, promocion_pedido, producto, estado_pedido } = require("../models");


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
exports.getDescuentosAplicadosPorUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    // Obtener los pedidos del usuario con sus detalles y promociones aplicadas
    const pedidos = await pedido.findAll({
      where: { id_usuario },
      include: [
        {
          model: promocion_pedido,
          include: [
            {
              model: promocion,
              attributes: ['nombre_promocion', 'valor_fijo', 'valor_porcentaje']
            },
            {
              model: producto,
              attributes: ['nombre']
            }
          ],
          attributes: ['id_promocion', 'id_pedido', 'monto_descuento']
        },
        {
          model: estado_pedido,
          attributes: ['nombre_pedido']
        }
      ],
      order: [['fecha_pedido', 'DESC']]
    });

    if (!pedidos || pedidos.length === 0) {
      return res.status(404).json({ message: "No hay pedidos para este usuario" });
    }

    // Preparar la información para la vista
    const descuentos = pedidos.flatMap((pedido) => {
      return pedido.promocion_pedido.map((promo) => {
        const monto = promo.promocion.valor_porcentaje
          ? `${(promo.promocion.valor_porcentaje * 100).toFixed(2)}%`
          : `L. ${parseFloat(promo.promocion.valor_fijo).toFixed(2)}`;

        return {
          fecha: pedido.fecha_pedido,
          producto: promo.producto.nombre,
          categoria: promo.producto.subcategoria.nombre, // Asegurarse de que la subcategoria esté definida
          estado: pedido.estado_pedido.nombre_pedido,
          monto: monto
        };
      });
    });

    res.json(descuentos);
  } catch (error) {
    console.error('Error al obtener descuentos aplicados por usuario:', error);
    res.status(500).json({ error: 'Error al obtener descuentos aplicados por usuario' });
  }
};

