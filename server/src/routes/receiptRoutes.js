const express = require('express');
const { uploadReceipt } = require('../controllers/receiptController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, uploadReceipt);

module.exports = router;

