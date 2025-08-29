const express = require('express');
const router = express.Router();


const authRoutes = require('../routes/routesLogin');
const prueba_rutas = require('./prueba');
const verify = require('../middleware/verificarToken'); // o authenticateJWT

router.use('/auth', authRoutes);
router.use('/prueba',prueba_rutas);

module.exports = router;
