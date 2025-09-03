const { subcategoria, producto, categoria } = require('../models');

exports.listar = async (req, res) => {
  try {
    const data = await subcategoria.findAll({
      attributes: ['id_subcategoria', 'nombre', 'id_categoria_padre'],
      include: { model: categoria, attributes: ['nombre'] }
    });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const item = await subcategoria.findByPk(req.params.id, {
      attributes: ['id_subcategoria', 'nombre', 'id_categoria_padre'],
      include: { model: categoria, attributes: ['nombre'] }
    });
    if (!item) return res.status(404).json({ msg: 'Subcategoría no encontrada' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const { nombre, id_categoria_padre } = req.body;
    if (!nombre || !id_categoria_padre)
      return res.status(400).json({ msg: 'nombre y id_categoria_padre requeridos' });
    const created = await subcategoria.create({ nombre, id_categoria_padre });
    res.status(201).json(created);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const { nombre, id_categoria_padre } = req.body;
    const [rows] = await subcategoria.update(
      { nombre, id_categoria_padre },
      { where: { id_subcategoria: req.params.id } }
    );
    if (!rows) return res.status(404).json({ msg: 'Subcategoría no encontrada' });
    res.json({ msg: 'Subcategoría actualizada' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.desactivarProductos = async (req, res) => {
  try {
    await producto.update({ activo: false }, { where: { id_subcategoria: req.params.id } });
    res.json({ msg: 'Productos de esta subcategoría desactivados' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};