const express = require("express");
const router = express.Router();
const { sucursal_producto, producto, sucursal } = require("../models");

router.get("/", async (req, res) => {
  const items = await sucursal_producto.findAll();
  res.json(items);
});

router.post("/", async (req, res) => {
  const nuevo = await sucursal_producto.create(req.body);
  res.json(nuevo);
});

module.exports = router;
