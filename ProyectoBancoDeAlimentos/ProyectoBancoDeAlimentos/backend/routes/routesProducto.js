const express = require('express');
const router  = express.Router();
const { producto } = require('../models');

// GET /api productos/destacados

router.get('/destacados', async (req, res) => {
  try {
    const products = await producto.findAll({
      where: { activo: true },
      attributes: [
        'id_producto',
        'nombre',
        'descripcion',
        'precio_base',
        'unidad_medida'
      ],
      /*include: [
        { model: Imagenproducto, attributes: ['url_imagen'], limit: 1 }
      ],*/
      order: [['id_producto', 'DESC']],
      limit: 10
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api productos/tendencias
router.get('/tendencias', async (req, res) => {
  try {
    const products = await producto.findAll({
      where: { activo: true },
      attributes: [
        'id_producto',
        'nombre',
        'descripcion',
        'precio_base'
      ],
      /*include: [
        { model: imagen_producto, attributes: ['url_imagen'], limit: 1 }
      ],*/
      order: [['precio_base', 'DESC']],  
      limit: 10
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

module.exports = router;