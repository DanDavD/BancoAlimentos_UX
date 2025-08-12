require("dotenv").config();

const { Sequelize } = require("sequelize");

// Convertir string 'true'/'false' a booleano
const useSSL = process.env.DB_USE_SSL === "true";

const dialectOptions = useSSL
  ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  : {};
  
console.log("DB_USER:", process.env.DB_USER, typeof process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD, typeof process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME, typeof process.env.DB_NAME);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: console.log,
    dialectOptions,
  }
);

module.exports = sequelize;
