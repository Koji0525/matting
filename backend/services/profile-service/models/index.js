const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgresql://mlmmp_user:mlmmp_password_dev_2024@localhost:5432/mlmmp',
  {
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.Profile = require('./Profile')(sequelize, Sequelize.DataTypes);
db.Like = require('./Like')(sequelize, Sequelize.DataTypes);
db.Message = require('./Message')(sequelize, Sequelize.DataTypes);

// Associations
db.Profile.hasMany(db.Like, { foreignKey: 'fromProfileId', as: 'sentLikes' });
db.Profile.hasMany(db.Like, { foreignKey: 'toProfileId', as: 'receivedLikes' });
db.Like.belongsTo(db.Profile, { foreignKey: 'fromProfileId', as: 'fromProfile' });
db.Like.belongsTo(db.Profile, { foreignKey: 'toProfileId', as: 'toProfile' });

db.Profile.hasMany(db.Message, { foreignKey: 'fromProfileId', as: 'sentMessages' });
db.Profile.hasMany(db.Message, { foreignKey: 'toProfileId', as: 'receivedMessages' });
db.Message.belongsTo(db.Profile, { foreignKey: 'fromProfileId', as: 'fromProfile' });
db.Message.belongsTo(db.Profile, { foreignKey: 'toProfileId', as: 'toProfile' });

module.exports = db;
