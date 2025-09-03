// controllers/AuthController.js
const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const Usuario = require('../models/Usuario')(sequelize, DataTypes);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
  try {
    console.log("pene 2");
    const { correo, contraseña } = req.body;
    if (!correo || !contraseña) {
      return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    console.log("pene 3");
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

    console.log("pene 4");
    //  Crear token
    const token = jwt.sign(
      { id: usuario.id_usuario, nombre: usuario.nombre , rol: usuario.id_rol}, // 👈 id_usuario
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

    console.log("pene 5");
    return res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('❌ Error en login:', error.stack);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

 const registrarse = async(req,res) =>{
  try{
    const {/*id_usuario,*/nombre, correo, contraseña, telefono, id_rol } = req.body;

    const user_existence = await Usuario.findOne({where : {correo}});

    if(user_existence){
      return res.status(400).json({ msg: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const new_user = await Usuario.create({
      //id_usuario,
      nombre,
      correo,
      contraseña: hashedPassword,
      id_rol,
      telefono,
    });

    res.status(201).json({
      message: 'Usuario registrado correctamente',
        nombre: new_user.nombre,
        correo: new_user.correo,
        telefono: new_user.telefono,
        rol: new_user.id_rol
    });

  }catch (error){
    console.error('No se pudo registrar el usuario!', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = { login, registrarse };