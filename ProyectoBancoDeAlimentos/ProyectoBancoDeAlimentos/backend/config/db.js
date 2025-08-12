const { Sequelize } = require('sequelize');

require('dotenv').config();

const isDocker = process.env.IS_DOCKER === 'true'; // usa esta variable para saber si estás en Docker

const host = isDocker ? process.env.DB_HOST_DOCKER : process.env.DB_HOST_LOCAL;

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: host,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;

/*const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  String(process.env.DB_NAME || 'postgres'),
  String(process.env.DB_USER || 'postgres'),
  String(process.env.DB_PASSWORD || 'clave123'),
  {
    host: process.env.DB_HOST || 'database',
    dialect: 'postgres',
    port: Number(process.env.DB_PORT || 5432),
    logging: false
  }
);

module.exports = sequelize;
*/