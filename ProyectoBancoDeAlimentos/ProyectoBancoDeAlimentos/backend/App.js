require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/prueba');
const carrito_detalle = require('./routes/carrito_detalle');

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
  console.log(' Middleware CORS ejecutado para:', req.method, req.path);
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(cookieParser());
app.use(express.json());


app.use("/carrito-detalle", carrito_detalle);
app.use('/api', testRoutes);

// Rutas
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión exitosa a la base de datos PostgreSQL');
    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  }
}

startServer();
