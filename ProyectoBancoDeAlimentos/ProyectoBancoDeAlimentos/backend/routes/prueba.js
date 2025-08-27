const express = require('express');
const router = express.Router();
const { testRelaciones } = require('../controllers/prueba');

// Ruta para probar las relaciones entre models
router.get('/test-relaciones', testRelaciones);

module.exports = router;
