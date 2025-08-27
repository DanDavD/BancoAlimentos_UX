const express = require("express");
const router = express.Router();
const { marca_producto, producto } = require("../models");

router.get("/", async (req, res) => {
  const marcas = await marca_producto.findAll();
  res.json(marcas);
});

router.post("/", async (req, res) => {
  const nueva = await marca_producto.create(req.body);
  res.json(nueva);
});

module.exports = router;
