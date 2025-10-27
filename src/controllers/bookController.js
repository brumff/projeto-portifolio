const bookService = require('../service/bookService');

async function addBook(req, res) {
  const { titulo, autor, paginas } = req.body;
  const usuarioId = req.user.id;
  if (!titulo || !autor || !paginas) {
    return res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });
  }
  const book = bookService.addBook({ titulo, autor, paginas, usuarioId });
  res.status(201).json(book);
}

async function listBooks(req, res) {
  const usuarioId = req.user.id;
  const books = bookService.getBooksByUser(usuarioId);
  res.json(books);
}

module.exports = { addBook, listBooks };
