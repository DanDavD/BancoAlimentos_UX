module.exports = (sequelize, DataTypes) => {
  const cupon = sequelize.define(
    "cupon",
    {
      id_cupon: { type: DataTypes.INTEGER, primaryKey: true },
      tipo: DataTypes.STRING,
      valor: DataTypes.FLOAT,
      uso_por_usuario: DataTypes.INTEGER,
      termina_en: DataTypes.DATE,
      activo: DataTypes.BOOLEAN,
      codigo: DataTypes.STRING, // sin tilde
      descripcion: DataTypes.STRING,
    },
    {
      tableName: "cupon",
      timestamps: false,
      underscored: true,
    }
  );
  /*
  cupon.associate = (models) => {
    cupon.hasMany(models.historial_cupon, { foreignKey: 'id_cupon', as: 'historial' });
  };*/

  return cupon;
};
