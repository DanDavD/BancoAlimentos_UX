const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const models = {
  Usuario: require('./Usuario')
};

// Ejecutar asociaciones
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});



//Relaciones 
const carrito = require("./carrito")(sequelize, Sequelize.DataTypes);
const carrito_detalle = require("./carrito_detalle")(sequelize, Sequelize.DataTypes);
const categoria = require("./categoria")(sequelize, Sequelize.DataTypes);
const departamento = require("./departamento")(sequelize, Sequelize.DataTypes);
const direccion = require("./direccion")(sequelize, Sequelize.DataTypes);
const imagen_producto = require("./imagen_producto")(sequelize, Sequelize.DataTypes);
const marca_producto = require("./marca_producto")(sequelize, Sequelize.DataTypes);
const municipio = require("./municipio")(sequelize, Sequelize.DataTypes);
const producto = require("./producto")(sequelize, Sequelize.DataTypes);
const subcategoria = require("./subcategoria")(sequelize, Sequelize.DataTypes);
const sucursal = require("./sucursal")(sequelize, Sequelize.DataTypes);
const sucursal_producto = require("./sucursal_producto")(sequelize, Sequelize.DataTypes);
const valoracion_producto = require("./valoracion_producto")(sequelize, Sequelize.DataTypes);

//categoria - subcategoria
categoria.hasMany(subcategoria, { foreignKey: "id_categoria_padre" });//Padre
subcategoria.belongsTo(categoria, { foreignKey: "id_categoria_padre" });//Hijo

//subcategoria - producto
subcategoria.hasMany(producto, { foreignKey: "id_subcategoria" });
producto.belongsTo(subcategoria, { foreignKey: "id_subcategoria" });

//producto - imagen_producto
producto.hasMany(imagen_producto, { foreignKey: "id_producto" });
imagen_producto.belongsTo(producto, { foreignKey: "id_producto" });

//producto - valoracion_producto
producto.hasMany(valoracion_producto, { foreignKey: "id_producto" });
valoracion_producto.belongsTo(producto, { foreignKey: "id_producto" });

//producto - carrito_detalle
producto.hasMany(carrito_detalle, { foreignKey: "id_producto" });
carrito_detalle.belongsTo(producto, { foreignKey: "id_producto" });

//producto - sucursal_producto
producto.hasMany(sucursal_producto, { foreignKey: "id_producto" });
sucursal_producto.belongsTo(producto, { foreignKey: "id_producto" });

//municipio - sucursal
municipio.hasMany(sucursal, { foreignKey: "id_municipio" });
sucursal.belongsTo(municipio, { foreignKey: "id_municipio" });

//sucursal - sucursal_producto
sucursal.hasMany(sucursal_producto, { foreignKey: "id_sucursal" });
sucursal_producto.belongsTo(sucursal, { foreignKey: "id_sucursal" });

//carrito - carrito_detalle
carrito.hasMany(carrito_detalle, { foreignKey: "id_carrito" });
carrito_detalle.belongsTo(carrito, { foreignKey: "id_carrito" });

//departamento - municipio
departamento.hasMany(municipio, { foreignKey: "id_departamento" });
municipio.belongsTo(departamento, { foreignKey: "id_departamento" });

//municipio - direccion
municipio.hasMany(direccion, { foreignKey: "id_municipio" });
direccion.belongsTo(municipio, { foreignKey: "id_municipio" });

//marca_producto - producto
marca_producto.hasMany(producto, { foreignKey: "id_marca" });
producto.belongsTo(marca_producto, { foreignKey: "id_marca" });


module.exports = {carrito_detalle,carrito,categoria,departamento,direccion,imagen_producto,
marca_producto,municipio,producto,subcategoria,sucursal_producto,sucursal,valoracion_producto,
sequelize,Sequelize, ...models};
