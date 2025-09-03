// authenticateJWT.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const { Usuario, Rol } = require('../models'); // adjust path if needed

async function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ msg: 'No token' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const usuario = await Usuario.findByPk(decoded.id, {
      attributes: ['id_usuario', 'nombre', 'correo', 'foto_perfil_url', 'tema'],
      include: { model: Rol, as: 'rol', attributes: ['nombre_rol'] }
    });

    if (!usuario) return res.status(401).json({ msg: 'Usuario no existe' });

    req.user = usuario; 
    next();
  } catch (err) {
    return res.status(403).json({ msg: 'Token inválido o expirado' });
  }
}

module.exports = verifyToken;