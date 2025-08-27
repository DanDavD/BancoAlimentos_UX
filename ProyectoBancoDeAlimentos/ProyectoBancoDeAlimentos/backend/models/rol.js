module.exports = (sequelize, DataTypes) => {
  const rol = sequelize.define('rol', {
    id_rol:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_rol:   { type: DataTypes.ENUM('administrador', 'cliente'), allowNull: false },
  }, {
    tableName: 'rol',
    timestamps: false,
    underscored: true,
  });

  rol.associate = (models) => {
    rol.hasMany(models.Usuario, { foreignKey: 'id_rol', as: 'usuarios' });
    rol.belongsToMany(models.privilegio, {
      through: models.rol_privilegio,
      foreignKey: 'id_rol',
      otherKey: 'id_privilegio',
      as: 'privilegios',
    });
  };

  return rol;
};