const db = require('../models');
const { Op } = require('sequelize');

exports.create = async (req, res) => {
  try {
    const profile = await db.Profile.create(req.body);
    res.status(201).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error('プロフィール作成エラー:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const profiles = await db.Profile.findAll({
      order: [['created_at', 'DESC']],
    });
    res.json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    console.error('プロフィール取得エラー:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const profile = await db.Profile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'プロフィールが見つかりません' });
    }
    res.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error('プロフィール取得エラー:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await db.Profile.findByPk(id);
    
    if (!profile) {
      return res.status(404).json({ error: 'プロフィールが見つかりません' });
    }
    
    await profile.update(req.body);
    
    res.json({
      success: true,
      message: 'プロフィールを更新しました',
      data: profile,
    });
  } catch (error) {
    console.error('プロフィール更新エラー:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const { ageMin, ageMax, gender, country } = req.body;
    
    const where = {};
    
    if (ageMin || ageMax) {
      where.age = {};
      if (ageMin) where.age[Op.gte] = ageMin;
      if (ageMax) where.age[Op.lte] = ageMax;
    }
    
    if (gender) where.gender = gender;
    if (country) where.country = country;
    
    const profiles = await db.Profile.findAll({
      where,
      limit: 50,
      order: [['created_at', 'DESC']],
    });
    
    res.json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    console.error('検索エラー:', error);
    res.status(500).json({ error: error.message });
  }
};
