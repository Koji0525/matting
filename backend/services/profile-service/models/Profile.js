const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    // 基本情報
    name: { type: DataTypes.STRING, allowNull: false },
    birthdate: { type: DataTypes.DATEONLY, allowNull: false, comment: '生年月日（YYYY-MM-DD）' },
    gender: { type: DataTypes.ENUM('male', 'female', 'other'), allowNull: false },
    bloodType: { type: DataTypes.ENUM('A', 'B', 'O', 'AB') },
    timezone: { type: DataTypes.STRING, defaultValue: 'Asia/Tokyo', comment: 'タイムゾーン' },
    
    // 外見
    height: { type: DataTypes.INTEGER },
    bodyType: { type: DataTypes.ENUM('slender', 'average', 'athletic', 'muscular', 'curvy', 'plus-size') },
    
    // 居住地
    country: { type: DataTypes.STRING },
    prefecture: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    
    // 職業・学歴・収入
    occupation: { type: DataTypes.STRING },
    education: { type: DataTypes.ENUM('high-school', 'vocational', 'associate', 'bachelor', 'master', 'doctorate') },
    annualIncome: { type: DataTypes.ENUM('under-3m', '3m-5m', '5m-7m', '7m-10m', '10m-15m', '15m-20m', 'over-20m') },
    
    // 性格・趣味
    personality: { type: DataTypes.STRING },
    hobbies: { type: DataTypes.TEXT },
    interests: { type: DataTypes.TEXT },
    
    // 結婚観・子ども
    marriageDesire: { type: DataTypes.ENUM('asap', 'within-year', 'within-2-3-years', 'someday', 'undecided') },
    childrenDesire: { type: DataTypes.ENUM('want', 'want-if-possible', 'undecided', 'dont-want', 'already-have') },
    
    // ライフスタイル
    smoking: { type: DataTypes.ENUM('non-smoker', 'sometimes', 'smoker', 'trying-to-quit') },
    drinking: { type: DataTypes.ENUM('non-drinker', 'occasionally', 'socially', 'regularly') },
    
    // 追加項目
    religion: { type: DataTypes.STRING, comment: '宗教' },
    marriageHistory: { type: DataTypes.ENUM('never-married', 'divorced', 'widowed'), comment: '結婚歴' },
    hasChildren: { type: DataTypes.BOOLEAN, defaultValue: false, comment: '子どもの有無' },
    other: { type: DataTypes.TEXT, comment: 'その他・自由入力' },
    
    // 自己紹介
    bio: { type: DataTypes.TEXT },
    profileImage: { type: DataTypes.STRING }
  }, {
    tableName: 'profiles',
    timestamps: true,
    underscored: true
  });

  // 仮想フィールド：年齢（自動計算）
  Profile.prototype.getAge = function() {
    const today = new Date();
    const birthDate = new Date(this.birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return Profile;
};
