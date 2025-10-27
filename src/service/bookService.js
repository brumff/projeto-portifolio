const { createBook, findBookById, listBooksByUser } = require('../model/book');

function addBook(data) {
  return createBook(data);
}

function getBookById(id) {
  return findBookById(id);
}

function getBooksByUser(usuarioId) {
  return listBooksByUser(usuarioId);
}

module.exports = { addBook, getBookById, getBooksByUser };
