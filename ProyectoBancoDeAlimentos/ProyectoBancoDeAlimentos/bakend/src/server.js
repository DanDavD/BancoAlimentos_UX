const express = require('express');
const app = express();
const port = process.env.PORT || 4090;

app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en puerto ${port}`);
});
