const express = require('express');
const router  = express.Router();
const { categoria } = require('../models');

router.get('/', async (req, res) => {
  try {
    const cats = await categoria.findAll({ attributes: ['id_categoria', 'nombre', 'icono_categoria'] });
    res.json(cats);
  } catch (error) {
    console.error('Error solicitando categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
