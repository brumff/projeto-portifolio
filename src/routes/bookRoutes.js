const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, bookController.addBook);
router.get('/', authenticateToken, bookController.listBooks);

module.exports = router;
