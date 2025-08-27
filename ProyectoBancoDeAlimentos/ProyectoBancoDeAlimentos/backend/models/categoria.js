module.exports = (sequelize, DataTypes) => {
  const categoria = sequelize.define("categoria", {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    
    nombre: {
        type : DataTypes.STRING,
        allowNull : false
    },

    icono_categoria :{
        type : DataTypes.STRING,
        allowNull : false
    } 
  }, {
    tableName: "categoria",
    timestamps: false
  });

  return categoria;
};