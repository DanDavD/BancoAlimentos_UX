const express = require("express");
const router = express.Router();
const { direccion, municipio } = require("../models");

router.get("/", async (req, res) => {
  const dirs = await direccion.findAll();
  res.json(dirs);
});

router.post("/", async (req, res) => {
  const nueva = await direccion.create(req.body);
  res.json(nueva);
});

module.exports = router;
