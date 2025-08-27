module.exports = (sequelize, DataTypes) => {
  const carrito = sequelize.define("carrito", {
    id_carrito: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_creacion: DataTypes.DATE
  }, {
    tableName: "carrito",
    timestamps: false
  });

  return carrito;
};
