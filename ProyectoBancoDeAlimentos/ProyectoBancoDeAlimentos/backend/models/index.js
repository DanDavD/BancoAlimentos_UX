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

module.exports = {
  sequelize,
  Sequelize,
  ...models
};
