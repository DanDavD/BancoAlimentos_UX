const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const rol = require('../models/rol')(sequelize,DataTypes);
const privilegio = require('../models/privilegio')(sequelize,DataTypes);
const { rol_privilegio } = require('../models');
const Usuario = require('../models/Usuario')(sequelize, DataTypes);

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

//
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
