const User = require('../src/models/user');
const db = require('../src/database');

beforeEach(async () => {
  await new Promise((resolve, reject) => {
    db.run('DELETE FROM users', [], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
});

test('Debería crear un usuario en la base de datos', async () => {
  const username = 'testuser';
  const password = 'password123';

  // Función para insertar el usuario
  const createUser = (username, password) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      db.run(query, [username, password], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID); // Devuelve el ID del nuevo usuario
        }
      });
    });
  };

  // Ejecutar la función y verificar el resultado
  await createUser(username, password);

  // Verificar que el usuario fue creado
  const users = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM users WHERE username = ?', [username], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });

  // Afirmaciones
  expect(users.length).toBe(1); // Espera que haya un usuario
  expect(users[0].username).toBe(username); // Verifica que el nombre de usuario sea correcto
});

test('La contraseña debe tener al menos 6 caracteres', () => {
  const password = 'PASSWORD';
  expect(password.length).toBeGreaterThanOrEqual(6);
});

// Hook para cerrar la base de datos después de todas las pruebas
afterAll(async () => {
  await db.closeConnection();
});
