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

console.log('�� Starting Profile Service...');

db.sequelize.sync({ force: true }).then(async () => {
  console.log('✅ DB synchronized');
  
  console.log('📝 Creating sample profiles...');
  
  const profiles = await db.Profile.bulkCreate([
    {
      name: '太郎', birthdate: '1996-05-15', gender: 'male', country: 'JP', prefecture: '東京都', city: '渋谷区',
      occupation: 'ITエンジニア', education: 'bachelor', annualIncome: '5m-7m',
      smoking: 'non-smoker', drinking: 'occasionally', timezone: 'Asia/Tokyo',
      religion: '無宗教', marriageHistory: 'never-married', hasChildren: false,
      bio: 'よろしくお願いします', other: '休日は登山が趣味です'
    },
    {
      name: '花子', birthdate: '1999-08-22', gender: 'female', country: 'JP', prefecture: '大阪府', city: '大阪市',
      occupation: '事務職', education: 'bachelor', annualIncome: '3m-5m',
      smoking: 'non-smoker', drinking: 'socially', timezone: 'Asia/Tokyo',
      religion: '仏教', marriageHistory: 'never-married', hasChildren: false,
      bio: 'よろしくお願いします', other: '料理が得意です'
    },
    {
      name: '健太', birthdate: '1992-03-10', gender: 'male', country: 'JP', prefecture: '福岡県', city: '福岡市',
      occupation: 'インストラクター', education: 'vocational', annualIncome: '3m-5m',
      smoking: 'non-smoker', drinking: 'regularly', timezone: 'Asia/Tokyo',
      religion: '無宗教', marriageHistory: 'divorced', hasChildren: true,
      bio: 'よろしくお願いします', other: '子どもは元妻が養育しています'
    },
    {
      name: '美咲', birthdate: '1997-11-05', gender: 'female', country: 'JP', prefecture: '愛知県', city: '名古屋市',
      occupation: 'アパレル販売', education: 'high-school', annualIncome: 'under-3m',
      smoking: 'sometimes', drinking: 'occasionally', timezone: 'Asia/Tokyo',
      religion: 'キリスト教', marriageHistory: 'never-married', hasChildren: false,
      bio: 'よろしくお願いします', other: 'ファッションが大好きです'
    },
    {
      name: 'John', birthdate: '1994-07-20', gender: 'male', country: 'US', city: 'New York',
      occupation: 'Software Engineer', education: 'master', annualIncome: 'over-20m',
      smoking: 'non-smoker', drinking: 'socially', timezone: 'America/New_York',
      religion: 'Christian', marriageHistory: 'never-married', hasChildren: false,
      bio: 'Nice to meet you', other: 'Love traveling'
    }
  ]);
  
  console.log('✅ Created', profiles.length, 'sample profiles');
  profiles.forEach(p => console.log(`  - ${p.name} (${p.getAge()}歳, ${p.id})`));
  
  app.listen(PORT, () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Profile Service READY on port ${PORT}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  });
}).catch(err => {
  console.error('❌ Startup Error:', err.message);
  console.error('Stack:', err.stack);
  process.exit(1);
});
