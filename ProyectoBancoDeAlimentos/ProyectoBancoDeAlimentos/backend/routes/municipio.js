const express = require("express");
const router = express.Router();
const { municipio, sucursal, direccion, departamento } = require("../models");

router.get("/", async (req, res) => {
  const municipios = await municipio.findAll();
  res.json(municipios);
});

router.get("/con-relaciones", async (req, res) => {
  const municipios = await municipio.findAll({ include: [sucursal, direccion, departamento] });
  res.json(municipios);
});

router.post("/", async (req, res) => {
  const nuevo = await municipio.create(req.body);
  res.json(nuevo);
});

module.exports = router;
