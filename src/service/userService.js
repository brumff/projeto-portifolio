const { createUser, findUserByEmail, findUserById } = require('../model/user');

function registerUser(data) {
  if (findUserByEmail(data.email)) {
    throw new Error('E-mail já cadastrado');
  }
  return createUser(data);
}

function getUserByEmail(email) {
  return findUserByEmail(email);
}

function getUserById(id) {
  return findUserById(id);
}

module.exports = { registerUser, getUserByEmail, getUserById };
