const { Receipt, Transaction, Category } = require('../models');
const Tesseract = require('tesseract.js');

exports.uploadReceipt = async (req, res) => {
  try {
    const { filePath } = req.body;

    // Save receipt first
    const receipt = await Receipt.create({
      filePath,
      userId: req.user.id
    });

    // Extract text from receipt using OCR
    const { data: { text } } = await Tesseract.recognize(filePath, 'eng');

    // Save extracted text in receipt
    receipt.extractedText = text;
    await receipt.save();

    // OPTIONAL: parse text to find expenses
    // This is basic regex assuming amounts like 123.45 or 123
    const expenseMatches = text.match(/(\d+\.\d{1,2}|\d+)/g);
    let totalExpense = 0;
    if (expenseMatches) {
      totalExpense = expenseMatches.reduce((acc, val) => acc + parseFloat(val), 0);
    }

    // Create transaction record automatically
    await Transaction.create({
      amount: totalExpense,
      type: 'expense',
      description: 'Receipt uploaded',
      date: new Date(),
      userId: req.user.id,
      receiptId: receipt.id
    });

    res.status(201).json({ receipt, extractedText: text, totalExpense });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Receipt upload failed', details: err.message });
  }
};

