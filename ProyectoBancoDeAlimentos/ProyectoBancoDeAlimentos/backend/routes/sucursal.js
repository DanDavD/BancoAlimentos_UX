const express = require("express");
const router = express.Router();
const { sucursal, sucursal_producto, municipio } = require("../models");

router.get("/", async (req, res) => {
  const sucursales = await sucursal.findAll();
  res.json(sucursales);
});

router.get("/con-productos", async (req, res) => {
  const sucursales = await sucursal.findAll({ include: sucursal_producto });
  res.json(sucursales);
});

router.post("/", async (req, res) => {
  const nueva = await sucursal.create(req.body);
  res.json(nueva);
});

module.exports = router;
