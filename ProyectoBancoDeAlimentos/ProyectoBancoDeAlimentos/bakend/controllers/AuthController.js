const bcrypt = require('bcrypt');
const { Usuario } = require('../models');
const { generateToken } = require('../services/jwtService');

async function login(req, res) {
  const { nombre_usuario, contraseña } = req.body;
  const user = await Usuario.findOne({ where: { nombre_usuario } });
  if (!user) return res.status(401).json({ msg: 'Usuario no encontrado' });

  const match = await bcrypt.compare(contraseña, user.contraseña);
  if (!match) return res.status(401).json({ msg: 'Contraseña incorrecta' });

  const token = generateToken({ id: user.id_usuario, nombre_usuario: user.nombre_usuario });
  res.json({ token });
}

module.exports = { login };
