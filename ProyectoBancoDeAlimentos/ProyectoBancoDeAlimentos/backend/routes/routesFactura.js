const express = require("express");
const router = express.Router();

const MetodoListFacturasUser = require("../controllers/facturaController");

// Obtener todas las facturas del usuario autenticado con detalles
router.get("/", MetodoListFacturasUser.getAllFacturasByUserwithDetails);

module.exports = router;
