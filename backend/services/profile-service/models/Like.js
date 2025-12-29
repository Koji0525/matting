const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Like = sequelize.define(
    'Like',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fromProfileId: {
        type: DataTypes.UUID,
        allowNull: false,
        comment: 'いいねした人',
      },
      toProfileId: {
        type: DataTypes.UUID,
        allowNull: false,
        comment: 'いいねされた人',
      },
    },
    {
      tableName: 'likes',
      schema: 'mlmmp',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['from_profile_id', 'to_profile_id'],
        },
      ],
    }
  );

  return Like;
};
