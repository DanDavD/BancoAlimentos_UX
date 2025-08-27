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

    producto.associate = (models) => {
    // Para traer detalles de factura desde producto
    producto.hasMany(models.factura_detalle, {
      foreignKey: 'id_producto',
      as: 'facturas_detalle',
    });

    // Para traer promociones directamente sin pasar por el puente en el include
    producto.belongsToMany(models.promocion, {
      through: models.promocion_producto,
      foreignKey: 'id_producto',
      otherKey: 'id_promocion',
      as: 'promociones',
    });
  };

  return producto;
};