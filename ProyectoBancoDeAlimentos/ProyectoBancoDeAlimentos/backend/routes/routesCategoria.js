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


// GET /api/categorias/id
router.get('/:id', async (req, res) => {
  try {
    const cat = await categoria.findByPk(req.params.id, {
      attributes: ['id_categoria', 'nombre', 'icono_categoria']
    });
    if (!cat) return res.status(404).json({ msg: 'Categoría no encontrada' });
    res.json(cat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/categorias
router.post('/', async (req, res) => {
  try {
    const { nombre, icono_categoria } = req.body;
    if (!nombre) return res.status(400).json({ msg: 'El nombre es obligatorio' });
    const newCat = await categoria.create({ nombre, icono_categoria });
    res.status(201).json(newCat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/categorias/id
router.put('/:id', async (req, res) => {
  try {
    const { nombre, icono_categoria } = req.body;
    const [rows] = await categoria.update(
      { nombre, icono_categoria },
      { where: { id_categoria: req.params.id } }
    );
    if (!rows) return res.status(404).json({ msg: 'Categoría no encontrada' });
    res.json({ msg: 'Categoría actualizada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/categorias/id  
router.delete('/:id', async (req, res) => {
  try {
    const { producto } = require('../models');
    await producto.update(
      { activo: false },
      { where: { id_subcategoria: req.params.id } } 
    );
    res.json({ msg: 'productos de esta categoría desactivados' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
