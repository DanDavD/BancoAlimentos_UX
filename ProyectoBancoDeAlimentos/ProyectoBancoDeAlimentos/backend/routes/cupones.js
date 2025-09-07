const express = require('express');
const router = express.Router();

const cuponController = require('../controllers/cuponController');

router.post('/agregar/:id_usuario', cuponController.addCupon);
router.get('/getAllCupones', cuponController.getAllCupones);
router.get('/:id_usuario', cuponController.allCupones);


module.exports = router;