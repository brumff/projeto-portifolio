const { addReview, getReviewsByBook } = require('../model/review');

function addBookReview(data) {
  return addReview(data);
}

function getBookReviews(livroId) {
  return getReviewsByBook(livroId);
}

module.exports = { addBookReview, getBookReviews };
