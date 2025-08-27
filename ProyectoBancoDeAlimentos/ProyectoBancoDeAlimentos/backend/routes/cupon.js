const express = require("express");
const router = express.Router();
const { cupon } = require("../models");

router.get("/", async (req, res) => {
  try {
    const cupones = await cupon.findAll();
    res.json(cupones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los cupones" });
  }
});

router.post("/", async (req, res) => {
  try {
    const nuevoCupon = await cupon.create(req.body);
    res.status(201).json(nuevoCupon);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el cupón" });
  }
});

module.exports = router;
