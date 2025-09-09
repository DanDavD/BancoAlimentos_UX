const { pedido, estado_pedido, factura, factura_detalle, producto, subcategoria, categoria } = require('../models');
const { Op } = require("sequelize");

//retorna los pedidos del usuario dado, donde el nombre_pedido sea "Enviado".
exports.getPedidosEntregados = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - 30);

    const pedidosUsuario = await Usuario.findOne({
        where: { id_usuario },
        attributes: ["id_usuario", "nombre", "apellido", "correo"],
        include: [
            {
            model: pedido,
            where: {
                fecha_pedido: {
                [Op.gte]: fechaLimite//fechaLimite < fecha_pedido
                }
            },
            include: [
                {
                model: estado_pedido,
                where: { nombre_pedido: "Enviado" },
                attributes: ["nombre_pedido"]
                }
            ]
            }
        ]
        });

    if (!pedidosUsuario) {
      return res.status(404).json({ error: "Usuario no encontrado o sin pedidos entregados" });
    }

    res.json(pedidosUsuario);
  } catch (error) {
    console.error("Error al obtener pedidos entregados!", error);
    res.status(500).json({ error: "Error al obtener pedidos entregados!" });
  }
};

exports.getHistorialComprasProductos = async (req, res) => {
  try {
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - 30);

    const detalles = await factura_detalle.findAll({
      attributes: ["subtotal_producto"],
      include: [
        {
          model: producto,
          attributes: ["nombre"],
          include: [
            {
              model: subcategoria,
              as: "subcategoria",
              attributes: ["nombre"],
              include: [
                {
                  model: categoria,
                  as: "categoria",
                  attributes: ["nombre"],
                },
              ],
            },
          ],
        },
        {
          model: factura,
          attributes: ["id_pedido"],
          include: [
            {
              model: pedido,
              attributes: ["fecha_pedido"],
              where: { fecha_pedido: { [Op.gte]: fechaLimite } },
              include: [
                {
                  model: estado_pedido,
                  attributes: ["nombre_pedido"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (detalles.length === 0) {
      return res.status(404).json({ message: "No hay productos vendidos en los últimos 30 días!" });
    }

    const resultado = detalles.map(detalle => ({
      nombre_producto: detalle.producto?.nombre || "Sin nombre",
      categoria: detalle.producto?.subcategoria?.categoria?.nombre || "Sin categoría",
      subtotal_producto: detalle.subtotal_producto,
      estado_pedido: detalle.factura?.pedido?.estado_pedido?.nombre_pedido || "Sin estado",
      fecha_pedido: detalle.factura?.pedido?.fecha_pedido,
    }));

    res.json(resultado);
  } catch (error) {
    console.error("Error al obtener historial de productos:", error);
    res.status(500).json({ error: "Error al obtener historial de productos" });
  }
};

