const express = require('express');
const router  = express.Router();
const { promocion } = require('../models');

// GET /api/promociones
router.get('/', async (req, res) => {
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
  ;
});

module.exports = router;