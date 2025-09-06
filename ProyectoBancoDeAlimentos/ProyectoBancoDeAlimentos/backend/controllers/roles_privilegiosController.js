const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const { Usuario, rol, privilegio, rol_privilegio } = require('../models');

//falta probar add rol, ya se cambio el campo.
//falta agregar cupon y eliminar.
//ruta para activar verificacion de dos pasos.
//Y una ruta para cuanfo inicie sesion si tiene activada 
//la verificacion de dos pasos que le mande un codigo de verificación



//no se puede aun porque en el model de rol, nombre_rol es un enum (tiene que ser un string)
exports.addRol = async (req,res) => {
    try{
        const {id_usuario} = req.params;

        const {nombre_rol} = req.body;

        const user = await Usuario.findByPk(id_usuario);

        if(!user){
            return res.status(404).json({message : "Usuario no existe!"});
        }
        
        if(user.id_rol !== 1){
            return res.status(403).json({ message: "No tienes permisos para crear un rol!" });
        }

        await rol.create({
            nombre_rol
        });
        res.status(201).json({message : "rol creado exitosamente!"});
    }catch(error){
        console.error(error);
        return res.status(500).json({message : "Error al agregar rol!"});
    }
}

exports.addPrivilegio = async (req,res) => {
    try{
        const {id_usuario} = req.params;

        const {nombre_privilegio} = req.body;

        const user = await Usuario.findByPk(id_usuario);

        if(!user){
            return res.status(404).json({message : "Usuario no existe!"});
        }
        
        if(user.id_rol !== 1){
            return res.status(403).json({ message: "No tienes permisos para crear un privilegio!" });
        }

        await privilegio.create({
            nombre_privilegio
        });

        res.status(201).json({message : "Privilegio creado exitosamente!"});

    }catch(error){
        console.error(error);
        return res.status(500).json({message : "Error al agregar privilegio!"});
    }
}

exports.asignarPrivilegioARol = async (req, res) => {
  try {
    const { id_rol, id_privilegio } = req.body;

    const asignacion = await rol_privilegio.create({ id_rol, id_privilegio });

    return res.status(201).json({ message: 'Privilegio asignado al rol correctamente', asignacion });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al asignar privilegio al rol' });
  }
};

exports.getRoles = async (req,res) => {
    try {
        const roles = await rol.findAll();
        return res.status(200).json(roles);
    } catch (error) {
        console.error('Error al obtener roles:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

exports.getPrivilegios = async (req, res) => {
  try {
    const privilegios = await privilegio.findAll();
    return res.status(200).json(privilegios);
  } catch (error) {
    console.error('Error al obtener privilegios:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getRolesYPrivilegiosDeUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const user = await Usuario.findByPk(id_usuario, {
      attributes: [],
      include: [
        {
          model: rol,
          attributes: ['nombre_rol'],
          include: [
            {
              model: privilegio,
              attributes: ['nombre_privilegio'],
              through: { attributes: [] }
            }
          ]
        }
      ]
    });


    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json(user.rols || user.rol); // Sequelize puede devolver en plural
  } catch (error) {
    console.error('Error al obtener roles y privilegios del usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
