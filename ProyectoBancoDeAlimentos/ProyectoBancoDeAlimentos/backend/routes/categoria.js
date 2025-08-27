const express = require("express");
const router = express.Router();
const { categoria, subcategoria } = require("../models");

// GET: todas las categorías
router.get("/", async (req, res) => {
  const categorias = await categoria.findAll();
  res.json(categorias);
});

// GET: categoría con subcategorías
router.get("/con-subcategorias", async (req, res) => {
  const categorias = await categoria.findAll({
    include: subcategoria
  });
  res.json(categorias);
});

// POST: crear nueva categoría
router.post("/", async (req, res) => {
  const nuevaCategoria = await categoria.create(req.body);
  res.json(nuevaCategoria);
});

module.exports = router;
