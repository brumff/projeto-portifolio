const reviewService = require('../service/reviewService');

async function addReview(req, res) {
  const usuarioId = req.user.id;
  const { livroId, nota, comentario } = req.body;
  if (!livroId || typeof nota !== 'number') {
    return res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });
  }
  const review = reviewService.addBookReview({ usuarioId, livroId, nota, comentario });
  res.status(201).json(review);
}

async function getReviews(req, res) {
  const { livroId } = req.params;
  const reviews = reviewService.getBookReviews(parseInt(livroId));
  res.json(reviews);
}

module.exports = { addReview, getReviews };
