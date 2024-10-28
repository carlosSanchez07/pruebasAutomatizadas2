const db = require('./database');

module.exports = (app) => {
  // Ruta para registrar un usuario
  app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Validar la contraseña
    if (!isValidPassword(password)) {
      return res.status(400).send('La contraseña debe tener al menos 6 caracteres, incluir al menos un número y un carácter especial.');
    }

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

// validation.js

// Función para validar la contraseña
const isValidPassword = (password) => {
  const hasMinLength = password.length > 6;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return hasMinLength && hasNumber && hasSpecialChar;
};

module.exports = { isValidPassword };  // Asegúrate de exportar la función
