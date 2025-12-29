const db = require('../models');

exports.sendLike = async (req, res) => {
  try {
    const { fromProfileId, toProfileId } = req.body;

    if (!fromProfileId || !toProfileId) {
      return res.status(400).json({ error: 'fromProfileIdとtoProfileIdは必須です' });
    }

    const existing = await db.Like.findOne({
      where: { fromProfileId, toProfileId },
    });

    if (existing) {
      return res.status(409).json({ error: '既にいいね済みです' });
    }

    const like = await db.Like.create({ fromProfileId, toProfileId });

    res.status(201).json({
      success: true,
      message: 'いいねを送信しました',
      data: like,
    });
  } catch (error) {
    console.error('いいね送信エラー:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getReceivedLikes = async (req, res) => {
  try {
    const { profileId } = req.params;

    const likes = await db.Like.findAll({
      where: { toProfileId: profileId },
      include: [{ model: db.Profile, as: 'fromProfile' }],
      order: [['created_at', 'DESC']],
    });

    res.json({
      success: true,
      count: likes.length,
      data: likes,
    });
  } catch (error) {
    console.error('いいね取得エラー:', error);
    res.status(500).json({ error: error.message });
  }
};
