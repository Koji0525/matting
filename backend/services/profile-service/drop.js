const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres', logging: false });
(async () => {
  try {
    await sequelize.query('DROP TABLE IF EXISTS messages CASCADE');
    await sequelize.query('DROP TABLE IF EXISTS likes CASCADE');
    await sequelize.query('DROP TABLE IF EXISTS profiles CASCADE');
    console.log('✅ テーブル削除完了');
    process.exit(0);
  } catch (err) {
    console.error('エラー:', err.message);
    process.exit(1);
  }
})();
