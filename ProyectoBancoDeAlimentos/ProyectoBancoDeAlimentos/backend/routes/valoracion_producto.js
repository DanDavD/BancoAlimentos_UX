const express = require("express");
const router = express.Router();
const { valoracion_producto, producto } = require("../models");

router.get("/", async (req, res) => {
  const vals = await valoracion_producto.findAll();
  res.json(vals);
});

router.post("/", async (req, res) => {
  const nueva = await valoracion_producto.create(req.body);
  res.json(nueva);
});

module.exports = router;
