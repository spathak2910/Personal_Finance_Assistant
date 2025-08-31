const { Transaction, Category } = require('../models');

exports.addTransaction = async (req, res) => {
  try {
    const { amount, type, description, categoryId, date } = req.body;
    const transaction = await Transaction.create({
      amount,
      type,
      description,
      categoryId,
      date,
      userId: req.user.id
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: 'Transaction creation failed', details: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.user.id },
      include: Category
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Fetching failed', details: err.message });
  }
};

