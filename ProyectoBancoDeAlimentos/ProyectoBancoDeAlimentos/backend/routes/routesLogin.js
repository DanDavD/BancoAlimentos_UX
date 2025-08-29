const express = require('express');
const router  = express.Router();
const { login } = require('../controllers/AuthController');

router.post('/login', login);
router.get('/perfil', verificarToken, (req, res) => {
  // Si tu middleware ya mete el usuario completo con su rol en req.user:
  return res.json(req.user);
});
module.exports = router;