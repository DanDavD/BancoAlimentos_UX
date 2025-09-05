module.exports = (sequelize, DataTypes) => {
  const cupon = sequelize.define('cupon', {
    id_cupon:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    codigo:           { type: DataTypes.STRING, unique: true },
    descripcion:      DataTypes.STRING,
    tipo:             DataTypes.STRING,
    valor:            DataTypes.DOUBLE,
    uso_max:          DataTypes.INTEGER,
    uso_por_usuario:  DataTypes.INTEGER,
    compra_min:       DataTypes.DOUBLE,
    inicia_en:        DataTypes.DATEONLY,
    termina_en:       DataTypes.DATEONLY,
    activo:           DataTypes.BOOLEAN,
    creado_en:        DataTypes.DATEONLY,
  }, {
    tableName: 'cupon',
    timestamps: false,
    underscored: true,
  });

  cupon.associate = (models) => {
    cupon.hasMany(models.historial_cupon, { foreignKey: 'id_cupon', as: 'historial' });
  };

  return cupon;
};