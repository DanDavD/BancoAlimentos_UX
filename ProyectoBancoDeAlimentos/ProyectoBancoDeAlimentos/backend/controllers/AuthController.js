const bcrypt = require('bcrypt');
const { Usuario } = require('../models');
const { generateToken } = require('../services/jwtService');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { User, password } = req.body;
    console.log('📥 Datos recibidos:', { User, password });

    const usuario = await Usuario.findOne({ where: { nickname: User } });

    if (!usuario) {
      console.warn('⚠️ Usuario no encontrado en base de datos');
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    console.log('👤 Usuario encontrado:', usuario.nickname);
    console.log('🔐 Hash en base de datos:', usuario.password);

    const passwordValida = await bcrypt.compare(password, usuario.password);
    console.log('🔎 ¿Contraseña válida?:', passwordValida);

    if (!passwordValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // 🔐 Crear el token JWT
    const token = jwt.sign(
      { id: usuario.idusuario, nombre: usuario.nickname },
      process.env.JWT_SECRET || 'secreto',
      { expiresIn: '2h' }
    );

    console.log('✅ Token generado:', token);

    // 🧁 Guardar el token como cookie segura y HttpOnly
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // ✅ pon true si usas HTTPS en producción
      sameSite: 'Lax',
      maxAge: 2 * 60 * 60 * 1000 // 2 horas
    });

    return res.json({ message: 'Login exitoso' });
  } catch (error) {
    console.error('❌ Error en login:', error);
    return res.status(500).json({ message: 'Error del servidor si se corre' });
  }
};

module.exports = { login };
