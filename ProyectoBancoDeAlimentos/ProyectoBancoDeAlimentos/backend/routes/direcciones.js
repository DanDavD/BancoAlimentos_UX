const express = require('express');
const router = express.Router();

const direccionController = require('../controllers/direccionController');

router.get('/', direccionController.allDirections);
router.patch('/', direccionController.direccionDefault);
router.put('/', direccionController.actualizarDireccion);
router.delete('/', direccionController.eliminarDireccion);

module.exports = router;