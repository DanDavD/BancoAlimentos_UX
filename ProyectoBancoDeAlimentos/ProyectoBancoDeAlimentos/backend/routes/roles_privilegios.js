const express = require('express');
const router = express.Router();

const roles_privilegiosController = require('../controllers/roles_privilegiosController');

router.post('/agregar-rol/:id_usuario', roles_privilegiosController.addRol);//no se puede usar por el enum de rol
router.post('/agregar-privilegio/:id_usuario', roles_privilegiosController.addPrivilegio);//si
router.post('/asignar-rol-privilegio/:id_usuario',roles_privilegiosController.asignarPrivilegioARol);//si
router.get('/mostrar-roles',roles_privilegiosController.getRoles);//si
router.get('/mostrar-privilegios',roles_privilegiosController.getPrivilegios);//si
router.get('/mostrar-roles-privilegios-usuario/:id_usuario',roles_privilegiosController.getRolesYPrivilegiosDeUsuario);//si

module.exports = router;
