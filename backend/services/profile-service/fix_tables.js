const db = require('./models');

(async () => {
  try {
    // Likeテーブル作成
    await db.Like.sync({ force: false });
    console.log('✅ Likeテーブル確認');
    
    // Messageテーブル作成
    await db.Message.sync({ force: false });
    console.log('✅ Messageテーブル確認');
    
    // 件数確認
    const likeCount = await db.Like.count();
    const msgCount = await db.Message.count();
    
    console.log(`📊 いいね: ${likeCount}件`);
    console.log(`📊 メッセージ: ${msgCount}件`);
    
    process.exit(0);
  } catch (err) {
    console.error('❌ エラー:', err.message);
    process.exit(1);
  }
})();
