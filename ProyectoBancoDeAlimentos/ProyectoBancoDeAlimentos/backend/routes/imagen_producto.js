const express = require("express");
const router = express.Router();
const { imagen_producto, producto } = require("../models");

router.get("/", async (req, res) => {
  const imgs = await imagen_producto.findAll();
  res.json(imgs);
});

router.post("/", async (req, res) => {
  const nueva = await imagen_producto.create(req.body);
  res.json(nueva);
});

module.exports = router;
    