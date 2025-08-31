const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Transaction = sequelize.define('Transaction', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  type: { type: DataTypes.ENUM('income', 'expense'), allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  description: { type: DataTypes.TEXT },
}, { tableName: 'transactions' });

module.exports = Transaction;

