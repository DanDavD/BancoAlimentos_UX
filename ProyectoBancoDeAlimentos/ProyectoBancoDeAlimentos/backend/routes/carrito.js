const express = require("express");
const router = express.Router();
const { carrito, carrito_detalle } = require("../models");

router.get("/", async (req, res) => {
  const carritos = await carrito.findAll();
  res.json(carritos);
});

router.get("/con-detalles", async (req, res) => {
  const carritos = await carrito.findAll({ include: carrito_detalle });
  res.json(carritos);
});

router.post("/", async (req, res) => {
  const nuevo = await carrito.create(req.body);
  res.json(nuevo);
});

module.exports = router;
