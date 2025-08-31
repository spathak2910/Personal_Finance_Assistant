require('dotenv').config();
const express = require('express');
const cors = require('cors'); // ✅ import cors
const { sequelize } = require('./config/db');
require('./models'); // load models and associations

const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const receiptRoutes = require('./routes/receiptRoutes');

const app = express();

// ✅ Enable CORS for all origins
app.use(cors());

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/receipts', receiptRoutes);

app.get('/', (req, res) => {
  res.send('Personal Finance Assistant API running...');
});

// Sync DB
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Models synced with DB');
  } catch (err) {
    console.error('❌ Sync error:', err);
  }
})();

module.exports = app;
