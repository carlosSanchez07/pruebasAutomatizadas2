const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database'); // Importa la base de datos


const app = express();

app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public'))); // Archivos estáticos

// Rutas
require('./routes')(app);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

module.exports = app;
