const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database'); // Importa la base de datos

<<<<<<< HEAD

const app = express();

app.use(express.json()); 
=======
const app = express();
>>>>>>> ee0f9332605e4830dcc6d2a34ca8a0deb648694a
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
