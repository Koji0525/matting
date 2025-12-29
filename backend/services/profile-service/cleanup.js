const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

(async () => {
  try {
    console.log('🗑️ 削除中...');
    
    await sequelize.query('DROP TABLE IF EXISTS messages CASCADE');
    await sequelize.query('DROP TABLE IF EXISTS likes CASCADE');
    await sequelize.query('DROP TABLE IF EXISTS profiles CASCADE');
    
    // ENUM型も削除
    await sequelize.query('DROP TYPE IF EXISTS "enum_messages_folder" CASCADE');
    await sequelize.query('DROP TYPE IF EXISTS "enum_profiles_gender" CASCADE');
    await sequelize.query('DROP TYPE IF EXISTS "enum_profiles_blood_type" CASCADE');
    await sequelize.query('DROP TYPE IF EXISTS "enum_profiles_body_type" CASCADE');
    await sequelize.query('DROP TYPE IF EXISTS "enum_profiles_education" CASCADE');
    await sequelize.query('DROP TYPE IF EXISTS "enum_profiles_annual_income" CASCADE');
    await sequelize.query('DROP TYPE IF EXISTS "enum_profiles_marriage_desire" CASCADE');
    await sequelize.query('DROP TYPE IF EXISTS "enum_profiles_children_desire" CASCADE');
    await sequelize.query('DROP TYPE IF EXISTS "enum_profiles_smoking" CASCADE');
    await sequelize.query('DROP TYPE IF EXISTS "enum_profiles_drinking" CASCADE');
    
    console.log('✅ 削除完了');
    process.exit(0);
  } catch (err) {
    console.error('エラー:', err.message);
    process.exit(1);
  }
})();
