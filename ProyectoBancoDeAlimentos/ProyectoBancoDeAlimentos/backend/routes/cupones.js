const express = require('express');
const router = express.Router();

const cuponController = require('../controllers/cuponController');

router.get('/:id_usuario', cuponController.allCupones);

module.exports = router;