const User = require('./User');
const Category = require('./Category');
const Transaction = require('./Transaction');
const Receipt = require('./Receipt');

// Associations
User.hasMany(Category, { foreignKey: 'userId' });
Category.belongsTo(User);

User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User);

Category.hasMany(Transaction, { foreignKey: 'categoryId' });
Transaction.belongsTo(Category);

User.hasMany(Receipt, { foreignKey: 'userId' });
Receipt.belongsTo(User);

Receipt.hasOne(Transaction, { foreignKey: 'receiptId' });
Transaction.belongsTo(Receipt);

module.exports = { User, Category, Transaction, Receipt };

