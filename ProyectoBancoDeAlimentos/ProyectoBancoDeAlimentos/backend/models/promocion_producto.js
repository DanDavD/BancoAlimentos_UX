module.exports = (sequelize, DataTypes) => {
  const promocion_producto = sequelize.define('promocion_producto', {
    id_producto:  { type: DataTypes.INTEGER, primaryKey: true },
    id_promocion: { type: DataTypes.INTEGER, primaryKey: true },
  }, { tableName: 'promocion_producto', timestamps: false, underscored: true });

  /*
  promocion_producto.associate = (models) => {
    promocion_producto.belongsTo(models.producto,  { foreignKey: 'id_producto',  as: 'producto'  });
    promocion_producto.belongsTo(models.promocion, { foreignKey: 'id_promocion', as: 'promocion' });
  };*/

  return promocion_producto;
};
