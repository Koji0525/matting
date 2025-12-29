const express = require('express');
const cors = require('cors');
const db = require('./models');
const profileRoutes = require('./routes/profile.routes');
const likeRoutes = require('./routes/like.routes');
const messageRoutes = require('./routes/message.routes');

const app = express();
const PORT = process.env.PROFILE_SERVICE_PORT || 3002;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'profile-service',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/profiles', profileRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/messages', messageRoutes);

// データベース初期化 + テストデータ自動投入
db.sequelize.sync({ force: false }).then(async () => {
  console.log('✅ Database synchronized');
  
  // データが空の場合のみテストデータ投入
  const count = await db.Profile.count();
  if (count === 0) {
    console.log('📝 テストデータ作成中...');
    
    await db.Profile.bulkCreate([
      { name: '太郎', age: 28, gender: 'male', country: 'JP', city: '東京', bio: 'エンジニアです' },
      { name: '花子', age: 25, gender: 'female', country: 'JP', city: '大阪', bio: '旅行が好きです' },
      { name: '健太', age: 32, gender: 'male', country: 'JP', city: '福岡', bio: 'スポーツ好き' },
      { name: '美咲', age: 27, gender: 'female', country: 'JP', city: '名古屋', bio: 'カフェ巡りが趣味' },
      { name: 'John', age: 30, gender: 'male', country: 'US', city: 'New York', bio: 'Software Engineer' }
    ]);
    
    console.log('✅ テストデータ5件作成完了');
  } else {
    console.log(`✅ 既存データ: ${count}件`);
  }
  
  app.listen(PORT, () => {
    console.log(`Profile Service listening on port ${PORT}`);
  });
}).catch(err => {
  console.error('❌ Database sync error:', err);
  process.exit(1);
});
