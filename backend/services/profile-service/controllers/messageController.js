const db = require('../models');

exports.sendMessage = async (req, res) => {
  try {
    const { fromProfileId, toProfileId, message } = req.body;

    if (!fromProfileId || !toProfileId || !message) {
      return res.status(400).json({ error: 'fromProfileId、toProfileId、messageは必須です' });
    }

    const newMessage = await db.Message.create({
      fromProfileId,
      toProfileId,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'メッセージを送信しました',
      data: newMessage,
    });
  } catch (error) {
    console.error('メッセージ送信エラー:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { profileId } = req.params;

    const messages = await db.Message.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          { fromProfileId: profileId },
          { toProfileId: profileId },
        ],
      },
      include: [
        { model: db.Profile, as: 'fromProfile' },
        { model: db.Profile, as: 'toProfile' },
      ],
      order: [['created_at', 'DESC']],
    });

    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error('メッセージ取得エラー:', error);
    res.status(500).json({ error: error.message });
  }
};
