const db = require('./database');

function createUser({ nome, email, senha }) {
  const id = db.users.length + 1;
  const user = { id, nome, email, senha };
  db.users.push(user);
  return user;
}

function findUserByEmail(email) {
  return db.users.find(u => u.email === email);
}

function findUserById(id) {
  return db.users.find(u => u.id === id);
}

module.exports = { createUser, findUserByEmail, findUserById };
