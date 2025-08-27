

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(55),
    allowNull: true,
  },
  correo: {
    type: DataTypes.STRING(55),
    allowNull: false,
    unique: true,
  },
  contraseña: {
    type: DataTypes.STRING(155),
    allowNull: false,
  },
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  fecha_actualizacion: {
    type: DataTypes.DATE,
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  foto_perfil_url: {
    type: DataTypes.STRING(255),
  },
  tema: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuario',
  timestamps: false,
});
Usuario.associate = (models) => {
    Usuario.belongsTo(models.rol, { foreignKey: 'id_rol', as: 'rol' });
    Usuario.hasMany(models.pedido, { foreignKey: 'id_usuario', as: 'pedidos' });
    Usuario.hasMany(models.carrito, { foreignKey: 'id_usuario', as: 'carritos' });
    Usuario.hasMany(models.direccion, { foreignKey: 'id_usuario', as: 'direcciones' });
    Usuario.hasMany(models.historial_cupon, { foreignKey: 'id_usuario', as: 'historialCupones' });
    Usuario.hasMany(models.valoracion_producto, { foreignKey: 'id_usuario', as: 'valoraciones' });
  };
  return Usuario;
}


