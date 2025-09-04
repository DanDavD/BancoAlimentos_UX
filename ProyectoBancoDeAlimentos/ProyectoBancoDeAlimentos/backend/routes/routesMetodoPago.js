const express = require("express");
const router = express.Router();
const metodoPagoController = require("../controllers/MetodoPagoController");

// Obtener todos los métodos de pago del usuario autenticado
router.get("/", metodoPagoController.getAllMetodosDePago);

// Crear un nuevo método de pago
router.post("/", metodoPagoController.createNuevoMetodoPago);

// Eliminar un método de pago por id
router.delete("/:id", metodoPagoController.deleteMetodoPago);

// Establecer un método de pago como predeterminado
router.patch("/default/:id", metodoPagoController.establecerComoDefault);

module.exports = router;
