const express = require("express");
const router = express.Router();
const { departamento, municipio } = require("../models");

router.get("/", async (req, res) => {
  const deps = await departamento.findAll();
  res.json(deps);
});

router.get("/con-municipios", async (req, res) => {
  const deps = await departamento.findAll({ include: municipio });
  res.json(deps);
});

router.post("/", async (req, res) => {
  const nuevo = await departamento.create(req.body);
  res.json(nuevo);
});

module.exports = router;
