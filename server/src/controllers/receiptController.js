const { Receipt } = require('../models');

exports.uploadReceipt = async (req, res) => {
  try {
    const { filePath } = req.body;
    const receipt = await Receipt.create({
      filePath,
      userId: req.user.id
    });
    res.status(201).json(receipt);
  } catch (err) {
    res.status(500).json({ error: 'Receipt upload failed', details: err.message });
  }
};

