const express = require("express");
const router = express.Router();
const { subcategoria, producto } = require("../models");

router.get("/", async (req, res) => {
  const subcategorias = await subcategoria.findAll();
  res.json(subcategorias);
});

router.get("/con-productos", async (req, res) => {
  const subcategorias = await subcategoria.findAll({ include: producto });
  res.json(subcategorias);
});

router.post("/", async (req, res) => {
  const nueva = await subcategoria.create(req.body);
  res.json(nueva);
});

module.exports = router;
