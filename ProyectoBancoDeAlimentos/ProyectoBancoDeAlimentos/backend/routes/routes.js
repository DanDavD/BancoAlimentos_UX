const express = require('express');
const router = express.Router();


const authRoutes = require('../routes/routesLogin');
const prueba_rutas = require('./prueba');

router.use('/auth', authRoutes);
router.use('/prueba',prueba_rutas);

module.exports = router;
