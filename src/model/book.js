const db = require('./database');

function createBook({ titulo, autor, paginas, usuarioId }) {
  const id = db.books.length + 1;
  const book = { id, titulo, autor, paginas, usuarioId };
  db.books.push(book);
  return book;
}

function findBookById(id) {
  return db.books.find(b => b.id === id);
}

function listBooksByUser(usuarioId) {
  return db.books.filter(b => b.usuarioId === usuarioId);
}

module.exports = { createBook, findBookById, listBooksByUser };
