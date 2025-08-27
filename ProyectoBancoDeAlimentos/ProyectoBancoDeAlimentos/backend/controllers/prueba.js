const {
  carrito,
  carrito_detalle,
  producto,
  subcategoria,
  categoria,
  imagen_producto,
  valoracion_producto,
  sucursal_producto,
  sucursal,
  municipio,
  departamento,
  direccion,
  marca_producto
} = require('../models');

const testRelaciones = async (req, res) => {
  try {
    const carritos = await carrito.findAll({
      include: [
        {
          model: carrito_detalle,
          include: [
            {
              model: producto,
              include: [
                { model: subcategoria, include: [categoria] },
                { model: imagen_producto },
                { model: valoracion_producto },
                { model: sucursal_producto, include: [sucursal] },
                { model: marca_producto }
              ]
            }
          ]
        }
      ]
    });

    res.json(carritos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los datos de prueba' });
  }
};

module.exports = { testRelaciones };
