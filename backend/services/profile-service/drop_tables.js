const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

(async () => {
  try {
    console.log('🗑️ テーブル削除中...');
    
    await sequelize.query('DROP TABLE IF EXISTS messages CASCADE');
    console.log('  ✅ messages削除');
    
    await sequelize.query('DROP TABLE IF EXISTS likes CASCADE');
    console.log('  ✅ likes削除');
    
    await sequelize.query('DROP TABLE IF EXISTS profiles CASCADE');
    console.log('  ✅ profiles削除');
    
    console.log('✅ テーブル削除完了');
    process.exit(0);
  } catch (err) {
    console.error('❌ エラー:', err.message);
    process.exit(1);
  }
})();
