const { pedido, estado_pedido, Usuario } = require('../models');

const { Op } = require("sequelize");
// Definir relaciones si no están en tu index.js
Usuario.hasMany(pedido, { foreignKey: "id_usuario" });
pedido.belongsTo(Usuario, { foreignKey: "id_usuario" });
pedido.belongsTo(estado_pedido, { foreignKey: "id_estado_pedido" });



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


