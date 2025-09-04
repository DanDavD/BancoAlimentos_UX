const { factura, factura_detalle, producto } = require("../models");

exports.getAllFacturasByUserwithDetails = async (req, res) => {
  try {
    const facturas = await factura.findAll({
      where: { id_usuario: req.user.id },
      include: [
        {
          model: factura_detalle,
          as: "detalles",
          include: [
            {
              model: producto,
              as: "producto",
            },
          ],
        },
      ],
    });
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener facturas" });
  }
};
