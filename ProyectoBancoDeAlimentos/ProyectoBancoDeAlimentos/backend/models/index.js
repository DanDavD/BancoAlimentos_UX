// backend/models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/config');

if (!config.db) {
  throw new Error("Configuración de DB no encontrada. Verifica config.js");
}

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect || 'postgres',
  logging: false
});

// Importa los modelos directamente (sin pasar sequelize)
const db = {
  ...require('./Usuario'), // Esto importa todos los modelos exportados en Usuario.js
  sequelize,
  Sequelize
};

// Establece las asociaciones
Object.keys(db).forEach(modelName => {
  if (db[modelName] && db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;



/*
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
*/
