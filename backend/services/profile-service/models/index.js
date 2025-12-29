const { Sequelize } = require('sequelize');
require('dotenv').config({ path: '/workspaces/matting/.env' });

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgresql://mlmmp_user:mlmmp_password_dev_2024@localhost:5432/mlmmp',
  {
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const Profile = require('./Profile')(sequelize);
const Like = require('./Like')(sequelize);
const Message = require('./Message')(sequelize);

// リレーション
Profile.hasMany(Like, { foreignKey: 'fromProfileId', as: 'sentLikes' });
Profile.hasMany(Like, { foreignKey: 'toProfileId', as: 'receivedLikes' });
Like.belongsTo(Profile, { foreignKey: 'fromProfileId', as: 'fromProfile' });
Like.belongsTo(Profile, { foreignKey: 'toProfileId', as: 'toProfile' });

Profile.hasMany(Message, { foreignKey: 'fromProfileId', as: 'sentMessages' });
Profile.hasMany(Message, { foreignKey: 'toProfileId', as: 'receivedMessages' });
Message.belongsTo(Profile, { foreignKey: 'fromProfileId', as: 'fromProfile' });
Message.belongsTo(Profile, { foreignKey: 'toProfileId', as: 'toProfile' });

const db = {
  sequelize,
  Sequelize,
  Profile,
  Like,
  Message,
};

module.exports = db;
