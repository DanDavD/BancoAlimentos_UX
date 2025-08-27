const express = require("express");
const router = express.Router();
const { producto, subcategoria, marca_producto, imagen_producto } = require("../models");

// GET: todos los productos
router.get("/", async (req, res) => {
  const productos = await producto.findAll();
  res.json(productos);
});

// GET: productos con subcategoria, marca e imágenes
router.get("/detalles", async (req, res) => {
  const productos = await producto.findAll({
    include: [subcategoria, marca_producto, imagen_producto]
  });
  res.json(productos);
});

// POST: crear un producto
router.post("/", async (req, res) => {
  const nuevoProducto = await producto.create(req.body);
  res.json(nuevoProducto);
});

module.exports = router;
