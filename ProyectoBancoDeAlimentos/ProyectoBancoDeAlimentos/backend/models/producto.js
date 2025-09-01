// models/producto.js
module.exports = (sequelize, DataTypes) => {
  const producto = sequelize.define(
    "producto",
    {
      id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      nombre: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      descripcion: DataTypes.STRING(100),

      precio_base: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      id_subcategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      unidad_medida: DataTypes.ENUM("unidad", "libra", "litro"),

      id_marca: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      porcentaje_ganancia: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
    },
    {
      tableName: "producto",
      timestamps: false,
    }
  );

  producto.associate = (models) => {
    producto.belongsTo(models.subcategoria, {
      foreignKey: "id_subcategoria",
      as: "subcategoria",
    });

    producto.belongsTo(models.marca_producto, {
      foreignKey: "id_marca",
      as: "marca",
    });

    producto.hasMany(models.imagen_producto, {
      foreignKey: "id_producto",
      as: "imagenes",
    });

    producto.hasMany(models.valoracion_producto, {
      foreignKey: "id_producto",
      as: "valoraciones",
    });

    producto.hasMany(models.sucursal_producto, {
      foreignKey: "id_producto",
      as: "stock_sucursales",
    });

    producto.hasMany(models.factura_detalle, {
      foreignKey: "id_producto",
      as: "facturas_detalle",
    });

    producto.belongsToMany(models.promocion, {
      through: models.promocion_producto,
      foreignKey: "id_producto",
      otherKey: "id_promocion",
      as: "promociones",
    });
  };

  return producto;
};
