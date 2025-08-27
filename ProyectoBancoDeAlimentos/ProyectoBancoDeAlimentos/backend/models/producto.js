module.exports = (sequelize, DataTypes) => {
  const producto = sequelize.define("producto", {
    id_producto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nombre: {
        type : DataTypes.STRING,
        allowNull : false
    },

    descripcion : DataTypes.STRING,

    precio_base : {
        type : DataTypes.DECIMAL,
        allowNull : false
    } ,

    id_subcategoria : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    
    activo : {
        type : DataTypes.BOOLEAN,
        defaultValue : true
    },

    unidad_medida : DataTypes.ENUM('unidad','libra','litro'),
    id_marca : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
  }, {
    tableName: "producto",
    timestamps: false
  });

  return producto;
};