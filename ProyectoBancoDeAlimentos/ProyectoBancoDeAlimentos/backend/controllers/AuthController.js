// controllers/AuthController.js
const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const Usuario = require('../models/Usuario')(sequelize, DataTypes);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    if (!correo || !contraseña) {
      return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    //  Buscar usuario 
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    //  Verificar contraseña
    const valid = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!valid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    //  Crear token
    const token = jwt.sign(
      { id: usuario.id_usuario, nombre: usuario.nombre },
      process.env.JWT_SECRET || 'secreto',
      { expiresIn: '2h' }
    );

    // Cookie opcional
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 2 * 60 * 60 * 1000
    });

    return res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('❌ Error en login:', error.stack);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { login };