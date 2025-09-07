const express = require('express');
const router  = express.Router();
// GET /api/promociones
const promocionesController = require('../controllers/promocionesController');
router.get('/', promocionesController.listar);

module.exports = router;