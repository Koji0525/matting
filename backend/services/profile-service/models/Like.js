module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
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
    }
  }, {
    tableName: 'likes',
    timestamps: true,
    underscored: true
  });

  return Like;
};
