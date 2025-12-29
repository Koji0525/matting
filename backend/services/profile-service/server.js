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
  res.json({ status: 'OK' });
});

app.use('/api/profiles', profileRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/messages', messageRoutes);

console.log('🚀 Starting...');

db.sequelize.sync({ force: true }).then(async () => {
  console.log('✅ DB created');
  
  const profiles = await db.Profile.bulkCreate([
    { name: '太郎', age: 28, gender: 'male', country: 'JP', city: '渋谷区', bio: 'よろしく' },
    { name: '花子', age: 25, gender: 'female', country: 'JP', city: '大阪市', bio: 'よろしく' },
    { name: '健太', age: 32, gender: 'male', country: 'JP', city: '福岡市', bio: 'よろしく' },
    { name: '美咲', age: 27, gender: 'female', country: 'JP', city: '名古屋市', bio: 'よろしく' },
    { name: 'John', age: 30, gender: 'male', country: 'US', city: 'New York', bio: 'Hi' }
  ]);
  
  console.log('✅ Created', profiles.length, 'profiles');
  profiles.forEach(p => console.log(`  - ${p.name} (${p.id})`));
  
  app.listen(PORT, () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ READY on :${PORT}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  });
}).catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
