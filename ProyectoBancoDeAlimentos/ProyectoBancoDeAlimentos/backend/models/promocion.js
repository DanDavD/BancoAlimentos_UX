module.exports = (sequelize, DataTypes) => {
  const promocion = sequelize.define('promocion', {
    id_promocion:   { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_tipo_promo:  DataTypes.INTEGER,
    nombre_promocion:DataTypes.STRING,
    descripción:     DataTypes.TEXT,
    valor_fijo:      DataTypes.DOUBLE,
    valor_porcentaje:DataTypes.DECIMAL(5, 2),
    compra_min:      DataTypes.DOUBLE,
    fecha_inicio:    DataTypes.DATEONLY,
    activa:          DataTypes.BOOLEAN,
    banner_url:      DataTypes.BLOB('long'),
    fecha_termina:   DataTypes.DATEONLY,
    creado_en:       DataTypes.DATEONLY,
  }, {
    tableName: 'promocion',
    timestamps: false,
    underscored: true,
  });

  promocion.associate = (models) => {
     promocion.belongsToMany(models.producto, {
      through: models.promocion_producto,
      foreignKey: 'id_promocion',
      otherKey: 'id_producto',
      as: 'productos',
    });

    // Si quieres promos por pedido también:
    promocion.belongsToMany(models.pedido, {
      through: models.promocion_pedido,
      foreignKey: 'id_promocion',
      otherKey: 'id_pedido',
      as: 'pedidos',
    });
  
  };

  return promocion;
};