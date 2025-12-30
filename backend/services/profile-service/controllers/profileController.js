const db = require('../models');

// 全プロフィール取得
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await db.Profile.findAll();
    
    // 年齢を追加
    const profilesWithAge = profiles.map(p => {
      const data = p.toJSON();
      data.age = p.getAge();
      return data;
    });
    
    res.json({ success: true, data: profilesWithAge });
  } catch (error) {
    console.error('Get all profiles error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 単一プロフィール取得
exports.getProfile = async (req, res) => {
  try {
    const profile = await db.Profile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    
    const data = profile.toJSON();
    data.age = profile.getAge();
    
    res.json({ success: true, data });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// プロフィール作成
exports.createProfile = async (req, res) => {
  try {
    const profile = await db.Profile.create(req.body);
    const data = profile.toJSON();
    data.age = profile.getAge();
    
    res.json({ success: true, data });
  } catch (error) {
    console.error('Create profile error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ プロフィール更新
exports.updateProfile = async (req, res) => {
  try {
    const profile = await db.Profile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    
    await profile.update(req.body);
    const data = profile.toJSON();
    data.age = profile.getAge();
    
    res.json({ success: true, data, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// プロフィール削除
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await db.Profile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    
    await profile.destroy();
    res.json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Delete profile error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
