const express = require('express');
const router = express.Router();

const usuariosControllers = require('../controllers/usuarioControllers');

router.post('/forget-password', usuariosControllers.forgetPassword);

module.exports = router;
