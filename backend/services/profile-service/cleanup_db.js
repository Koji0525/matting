const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  { dialect: 'postgres', logging: false }
);

(async () => {
  try {
    console.log('🗑️ テーブル削除中...');
    
    // 両方のスキーマから削除
    const queries = [
      'DROP TABLE IF EXISTS mlmmp.messages CASCADE',
      'DROP TABLE IF EXISTS mlmmp.likes CASCADE',
      'DROP TABLE IF EXISTS mlmmp.profiles CASCADE',
      'DROP TABLE IF EXISTS public.messages CASCADE',
      'DROP TABLE IF EXISTS public.likes CASCADE',
      'DROP TABLE IF EXISTS public.profiles CASCADE'
    ];
    
    for (const query of queries) {
      try {
        await sequelize.query(query);
        console.log('  ✅', query);
      } catch (err) {
        console.log('  ⏭️ ', query, '(存在しない)');
      }
    }
    
    console.log('✅ 削除完了');
    process.exit(0);
  } catch (err) {
    console.error('❌ エラー:', err.message);
    process.exit(1);
  }
})();
