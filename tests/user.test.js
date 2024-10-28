const User = require('../src/models/user');
const db = require('../src/database');

// Importar las funciones de validación de contraseñas
<<<<<<< HEAD
const isValidPassword = require('../src/validation'); // Ajusta la ruta según tu estructura de proyecto
=======
const { isValidPassword } = require('../src/routes'); // Ajusta la ruta según tu estructura de proyecto
>>>>>>> ee0f9332605e4830dcc6d2a34ca8a0deb648694a

beforeEach(async () => {
  await new Promise((resolve, reject) => {
    db.run('DELETE FROM users', [], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
});

// Pruebas para las funciones de validación de contraseñas
describe('Validación de contraseñas', () => {
  test('La contraseña debe ser válida si tiene más de 6 caracteres, al menos un número y un carácter especial', () => {
    const validPassword = 'Password123!';
    expect(isValidPassword(validPassword)).toBe(true);
  });

  test('La contraseña debe ser inválida si tiene menos de 6 caracteres', () => {
    const shortPassword = 'Pass!';
    expect(isValidPassword(shortPassword)).toBe(false);
  });

  test('La contraseña debe ser inválida si no tiene un número', () => {
    const noNumberPassword = 'Password!';
    expect(isValidPassword(noNumberPassword)).toBe(false);
  });

  test('La contraseña debe ser inválida si no tiene un carácter especial', () => {
    const noSpecialCharPassword = 'Password123';
    expect(isValidPassword(noSpecialCharPassword)).toBe(false);
  });
});

// Prueba para crear un usuario en la base de datos
test('Debería crear un usuario en la base de datos', async () => {
  const username = 'testuser';
  const password = 'password123!'; // Asegúrate de que esta contraseña cumpla con los requisitos

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

// Hook para cerrar la base de datos después de todas las pruebas
afterAll(async () => {
  await db.closeConnection();
});
