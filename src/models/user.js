const db = require('../database');

module.exports = {
  async create(username, password) {
    return db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
  },

  async getAll() {
    return db.all('SELECT * FROM users');
  }
};
