module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    gender: { type: DataTypes.ENUM('male', 'female', 'other'), allowNull: false },
    birthday: { type: DataTypes.DATEONLY },
    bloodType: { type: DataTypes.ENUM('A', 'B', 'O', 'AB', '不明') },
    height: { type: DataTypes.INTEGER },
    bodyType: { type: DataTypes.ENUM('スリム', '普通', 'ややぽっちゃり', 'グラマー', '筋肉質', '大柄') },
    country: { type: DataTypes.STRING(2), defaultValue: 'JP' },
    prefecture: { type: DataTypes.STRING(50) },
    city: { type: DataTypes.STRING(100) },
    occupation: { type: DataTypes.STRING(100) },
    education: { type: DataTypes.ENUM('高校卒業', '専門学校卒業', '短大卒業', '大学卒業', '大学院卒業', 'その他') },
    annualIncome: { type: DataTypes.ENUM('200万円未満', '200-400万円', '400-600万円', '600-800万円', '800-1000万円', '1000-1500万円', '1500万円以上', '未回答') },
    personality: { type: DataTypes.TEXT },
    hobbies: { type: DataTypes.TEXT },
    interests: { type: DataTypes.TEXT },
    marriageDesire: { type: DataTypes.ENUM('良い人がいればすぐにでも', '2〜3年以内', 'いつか結婚したい', '相手次第', 'まだ考えていない') },
    childrenDesire: { type: DataTypes.ENUM('欲しい', 'できればほしい', '相手次第', '欲しくない', 'まだ考えていない') },
    smoking: { type: DataTypes.ENUM('吸わない', 'ときどき吸う', '吸う', '禁煙中') },
    drinking: { type: DataTypes.ENUM('飲まない', 'ときどき飲む', 'よく飲む', '付き合い程度') },
    bio: { type: DataTypes.TEXT },
    profileImage: { type: DataTypes.STRING(500) }
  }, {
    tableName: 'profiles',
    timestamps: true,
    underscored: true
  });

  return Profile;
};
