module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    fromProfileId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'profiles', key: 'id' }
    },
    toProfileId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'profiles', key: 'id' }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'messages',
    timestamps: true,
    underscored: true
  });

  return Message;
};
