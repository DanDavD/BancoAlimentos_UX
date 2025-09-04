const express = require('express');
const router  = express.Router();
const productoCtrl = require('../controllers/productoController');

router.get('/destacados', productoCtrl.destacados);
router.get('/tendencias', productoCtrl.tendencias);

module.exports = router;