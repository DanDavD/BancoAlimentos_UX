const express = require('express');
const router = express.Router();

const roles_privilegiosController = require('../controllers/roles_privilegiosController');

router.post('/rol/:id_usuario', roles_privilegiosController.addRol);
router.post('/privilegio/:id_usuario', roles_privilegiosController.addPrivilegio);
router.post('/rol-privilegio/:id_usuario',roles_privilegiosController.asignarPrivilegioARol);

module.exports = router;
