const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, reviewController.addReview);
router.get('/:livroId', reviewController.getReviews);

module.exports = router;
