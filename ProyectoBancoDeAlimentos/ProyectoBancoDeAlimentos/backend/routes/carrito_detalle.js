const express = require("express");
const router = express.Router();
const { carrito_detalle, producto, carrito } = require("../models");

router.get("/", async (req, res) => {
  const detalles = await carrito_detalle.findAll();
  res.json(detalles);
});

router.post("/", async (req, res) => {
  const nuevo = await carrito_detalle.create(req.body);
  res.json(nuevo);
});

module.exports = router;
