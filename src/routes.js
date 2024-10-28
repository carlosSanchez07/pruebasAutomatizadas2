const db = require('./database');

module.exports = (app) => {
  // Ruta para registrar un usuario
  app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';

    db.run(query, [username, password], (err) => {
      if (err) {
        console.error('Error al registrar usuario:', err.message);
        res.status(500).send('Error al registrar el usuario.');
      } else {
        // Redirige a la lista de usuarios después del registro
        res.redirect('/users.html');
      }
    });
  });

  // Ruta para obtener la lista de usuarios
  app.get('/users', (req, res) => {
    db.all('SELECT username FROM users', [], (err, rows) => {
      if (err) {
        console.error('Error al obtener usuarios:', err.message);
        res.status(500).send('Error al obtener usuarios.');
      } else {
        res.json(rows);
      }
    });
  });
};
