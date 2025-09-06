module.exports = (sequelize, DataTypes) => {
  const pedido = sequelize.define('pedido', {
    id_pedido:        { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_estado:        DataTypes.INTEGER,
    id_usuario:       { type: DataTypes.INTEGER, allowNull: false },
    fecha_pedido:     { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    direccion_envio:  DataTypes.STRING(100),
    id_sucursal:      DataTypes.INTEGER,
    descuento:        DataTypes.DECIMAL(10, 2),
    id_cupon : DataTypes.INTEGER,
    id_estado_pedido : DataTypes.INTEGER,
  }, {
    tableName: 'pedido',
    timestamps: false,
    underscored: true,
  });

  /*
  pedido.associate = (models) => {
    pedido.belongsTo(models.Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
    pedido.belongsTo(models.Estado,  { foreignKey: 'id_estado',  as: 'estado' });
    pedido.belongsTo(models.Sucursal,{ foreignKey: 'id_sucursal',as: 'sucursal' });
    pedido.hasOne(models.Factura,    { foreignKey: 'id_pedido',  as: 'factura' });
    pedido.belongsToMany(models.promocion, { through: models.promocion_pedido, foreignKey: 'id_pedido', otherKey: 'id_promocion', as: 'promociones' });
    pedido.hasMany(models.historial_cupon, { foreignKey: 'id_pedido', as: 'historialCupones' });
  };*/

  return pedido;
};