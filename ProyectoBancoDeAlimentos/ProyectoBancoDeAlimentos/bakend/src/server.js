const express = require('express');
const app = express();
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const db = require("../config/db");

const port = process.env.PORT || 3001;
process.env.REACT_APP_BACKEND_PORT = port;
const authenticateJWT = require("../middleware/authenticateJWT");
const path = require("path");
const fs = require('fs');

//Routes
const routes = require("../routes/routes");
const { sequelize } = require('../models/index');
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(authenticateJWT);
app.use(routes);

//const { Usuario, Rol, Privilegio, RolPrivilegio } = require('./models');

async function start() {
  try {
    await sequelize.authenticate();
    console.log('DB conectada');

    await sequelize.sync({ alter: true });
    console.log('DB sincronizada');

    app.listen(process.env.PORT || 3000, () => {
      console.log('Servidor corriendo');
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

start();

//Esto puede ir en una ruta, servicio y controlador hola
const initApp = async () => {
  console.log("Testing the database connection..");
  try {
    await db.authenticate();
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const devMode = (process.env.DEV_MODE !== undefined) ? process.env.DEV_MODE.trim() === "true" : false;
    console.log("Dev Mode: ", devMode, typeof devMode);
    if (!devMode) {
      console.warn("Running in production mode!");
      app.use(express.static(path.join(__dirname, "../client/build")));

      app.get("*", async (req, res) => {
        //console.log(req);
        res.sendFile(
          path.join(__dirname, "../client/build", "index.html"),
          (err) => {
            if (err) {
              res.status(500).send(err);
            }
          }
        );
      });
    }

    app.listen(port, () => {
      console.log(`Server is running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    console.error("Parent error:", error.parent);
    console.error("Error details:", error);
  }
};

app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en puerto ${port}`);
});
