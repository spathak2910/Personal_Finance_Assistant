const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Receipt = sequelize.define('Receipt', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  filePath: { type: DataTypes.STRING, allowNull: false },
  extractedText: { type: DataTypes.TEXT },
}, { tableName: 'receipts' });

module.exports = Receipt;

