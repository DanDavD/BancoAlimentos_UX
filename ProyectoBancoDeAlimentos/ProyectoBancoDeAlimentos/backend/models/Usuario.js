const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Usuario extends Model {}
Usuario.init({
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagen_usuario: {
    type: DataTypes.STRING,
  },
  id_persona: {
    type: DataTypes.INTEGER,
  }
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuario',
  timestamps: false,
});

class Privilegio extends Model {}
Privilegio.init({
  id_privilegio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_privilegio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Privilegio',
  tableName: 'privilegio',
  timestamps: false,
});

class Rol extends Model {}
Rol.init({
  id_rol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_rol: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Rol',
  tableName: 'rol',
  timestamps: false,
});

class RolPrivilegio extends Model {}
RolPrivilegio.init({
  id_rol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Rol,
      key: 'id_rol',
    }
  },
  id_privilegio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Privilegio,
      key: 'id_privilegio',
    }
  }
}, {
  sequelize,
  modelName: 'RolPrivilegio',
  tableName: 'rol_privilegio',
  timestamps: false,
});

// Definir asociaciones
Rol.hasMany(Usuario, { foreignKey: 'id_rol' });
Usuario.belongsTo(Rol, { foreignKey: 'id_rol' });

Rol.belongsToMany(Privilegio, {
  through: RolPrivilegio,
  foreignKey: 'id_rol',
  otherKey: 'id_privilegio',
});

Privilegio.belongsToMany(Rol, {
  through: RolPrivilegio,
  foreignKey: 'id_privilegio',
  otherKey: 'id_rol',
});

module.exports = {
  Usuario,
  Privilegio,
  Rol,
  RolPrivilegio
};
