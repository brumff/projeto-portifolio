const db = require('./database');

function addReview({ usuarioId, livroId, nota, comentario }) {
  const review = { usuarioId, livroId, nota, comentario };
  db.reviews.push(review);
  return review;
}

function getReviewsByBook(livroId) {
  return db.reviews.filter(r => r.livroId === livroId);
}

module.exports = { addReview, getReviewsByBook };
