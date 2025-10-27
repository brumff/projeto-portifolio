const express = require('express');
const router = express.Router();
const readingController = require('../controllers/readingController');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, readingController.updateStatus);
router.get('/:livroId', authenticateToken, readingController.getStatus);

module.exports = router;
