const express = require('express');
const router  = express.Router();

const { login } = require('../controllers/AuthController');
const verificarToken = require('../middleware/verificarToken');

router.post('/login', login);
router.get('/perfil', verificarToken, (req, res) => res.json(req.user));

module.exports = router;