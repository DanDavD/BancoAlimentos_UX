const express = require('express');
const router  = express.Router();
const subcategoriaCtrl = require('../controllers/subcategoriaController');

router
  .get('/',     subcategoriaCtrl.listar)
  .get('/:id',  subcategoriaCtrl.obtener)
  .post('/',    subcategoriaCtrl.crear)
  .put('/:id',  subcategoriaCtrl.actualizar)
  .delete('/:id', subcategoriaCtrl.desactivarProductos);

module.exports = router;