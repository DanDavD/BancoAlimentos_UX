module.exports = (sequelize, DataTypes) => {
  const privilegio = sequelize.define('privilegio', {
    id_privilegio:      { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_privilegio:  { type: DataTypes.STRING(55), allowNull: false },
  }, {
    tableName: 'privilegio',
    timestamps: false,
    underscored: true,
  });

  privilegio.associate = (models) => {
    privilegio.belongsToMany(models.rol, {
      through: models.rol_privilegio,
      foreignKey: 'id_privilegio',
      otherKey: 'id_rol',
      as: 'roles',
    });
  };

  return privilegio;
};