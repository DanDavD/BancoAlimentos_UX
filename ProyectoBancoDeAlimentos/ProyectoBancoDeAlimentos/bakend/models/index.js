const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const sequelize = require('../config/db'); // tu conexión a la base de datos

// ... resto del código

const models = {};

// Leer todos los archivos de modelos en esta carpeta excepto index.js
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    // Si el modelo exporta la clase (ej: Usuario), la agregamos
    // Si exporta un objeto con modelos, unimos
    if (model.init && typeof model.init === 'function') {
      // Suponemos export default clase modelo
      models[model.name] = model;
    } else {
      Object.assign(models, model);
    }
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = { ...models, sequelize };

