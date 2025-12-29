const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Message = sequelize.define(
    'Message',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fromProfileId: {
        type: DataTypes.UUID,
        allowNull: false,
        comment: '送信者',
      },
      toProfileId: {
        type: DataTypes.UUID,
        allowNull: false,
        comment: '受信者',
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'メッセージ',
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: '既読',
      },
    },
    {
      tableName: 'messages',
      schema: 'mlmmp',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ['from_profile_id', 'to_profile_id'],
        },
      ],
    }
  );

  return Message;
};
