const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Profile = sequelize.define(
    'Profile',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '名前',
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 18,
          max: 100,
        },
        comment: '年齢',
      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: false,
        comment: '性別',
      },
      country: {
        type: DataTypes.STRING(2),
        allowNull: false,
        defaultValue: 'JP',
        comment: '国コード',
      },
      city: {
        type: DataTypes.STRING(100),
        comment: '都市',
      },
      bio: {
        type: DataTypes.TEXT,
        comment: '自己紹介',
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        comment: 'メール',
      },
    },
    {
      tableName: 'profiles',
      schema: 'mlmmp',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ['age', 'gender'],
        },
        {
          fields: ['country'],
        },
      ],
    }
  );

  return Profile;
};
