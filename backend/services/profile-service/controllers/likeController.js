const db = require('../models');

// いいね送信
exports.sendLike = async (req, res) => {
  try {
    const { fromProfileId, toProfileId } = req.body;
    
    // 重複チェック
    const existing = await db.Like.findOne({
      where: { fromProfileId, toProfileId }
    });
    
    if (existing) {
      return res.json({
        success: true,
        message: 'すでにいいねしています',
        data: existing
      });
    }
    
    const like = await db.Like.create({
      fromProfileId,
      toProfileId,
      read: false
    });
    
    res.json({
      success: true,
      message: 'いいねを送信しました',
      data: like
    });
  } catch (err) {
    console.error('いいね送信エラー:', err);
    res.status(500).json({ error: err.message });
  }
};

// いいね取得
exports.getLikes = async (req, res) => {
  try {
    const { profileId } = req.params;
    
    const likes = await db.Like.findAll({
      where: { toProfileId: profileId },
      include: [
        { 
          model: db.Profile, 
          as: 'fromProfile', 
          attributes: ['id', 'name', 'age', 'gender', 'city'] 
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ success: true, data: likes });
  } catch (err) {
    console.error('いいね取得エラー:', err);
    res.status(500).json({ error: err.message });
  }
};

// いいねを既読にする
exports.markLikeAsRead = async (req, res) => {
  try {
    const { likeId } = req.params;
    
    const like = await db.Like.findByPk(likeId);
    if (!like) {
      return res.status(404).json({ error: 'いいねが見つかりません' });
    }
    
    like.read = true;
    await like.save();
    
    res.json({
      success: true,
      message: '既読にしました',
      data: like
    });
  } catch (err) {
    console.error('いいね既読処理エラー:', err);
    res.status(500).json({ error: err.message });
  }
};

// 全いいねを既読にする
exports.markAllLikesAsRead = async (req, res) => {
  try {
    const { profileId } = req.params;
    
    const result = await db.Like.update(
      { read: true },
      { 
        where: { 
          toProfileId: profileId,
          read: false
        } 
      }
    );
    
    res.json({
      success: true,
      message: `全いいねを既読にしました（${result[0]}件）`
    });
  } catch (err) {
    console.error('全既読処理エラー:', err);
    res.status(500).json({ error: err.message });
  }
};

// 未読いいね数取得
exports.getUnreadLikesCount = async (req, res) => {
  try {
    const { profileId } = req.params;
    
    const count = await db.Like.count({
      where: {
        toProfileId: profileId,
        read: false
      }
    });
    
    res.json({ success: true, count });
  } catch (err) {
    console.error('未読いいね数取得エラー:', err);
    res.status(500).json({ error: err.message });
  }
};
