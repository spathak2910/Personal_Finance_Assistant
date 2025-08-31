require('dotenv').config();
const { Sequelize } = require('sequelize');

// Load env vars
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
})();

