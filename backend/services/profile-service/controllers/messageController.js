const db = require('../models');

// メッセージ送信
exports.sendMessage = async (req, res) => {
  try {
    const { fromProfileId, toProfileId, message } = req.body;
    
    const newMessage = await db.Message.create({
      fromProfileId,
      toProfileId,
      message,
      read: false,
      folder: 'inbox'
    });
    
    res.json({
      success: true,
      message: 'メッセージを送信しました',
      data: newMessage
    });
  } catch (err) {
    console.error('メッセージ送信エラー:', err);
    res.status(500).json({ error: err.message });
  }
};

// メッセージ取得
exports.getMessages = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { folder } = req.query;
    
    const where = {
      [db.Sequelize.Op.or]: [
        { fromProfileId: profileId },
        { toProfileId: profileId }
      ]
    };
    
    // フォルダフィルター
    if (folder) {
      where.folder = folder;
    }
    
    const messages = await db.Message.findAll({
      where,
      include: [
        { model: db.Profile, as: 'fromProfile', attributes: ['id', 'name', 'age', 'city'] },
        { model: db.Profile, as: 'toProfile', attributes: ['id', 'name', 'age', 'city'] }
      ],
      order: [['createdAt', 'ASC']]
    });
    
    res.json({ success: true, data: messages });
  } catch (err) {
    console.error('メッセージ取得エラー:', err);
    res.status(500).json({ error: err.message });
  }
};

// メッセージを既読にする
exports.markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    
    const message = await db.Message.findByPk(messageId);
    if (!message) {
      return res.status(404).json({ error: 'メッセージが見つかりません' });
    }
    
    message.read = true;
    await message.save();
    
    res.json({
      success: true,
      message: '既読にしました',
      data: message
    });
  } catch (err) {
    console.error('既読処理エラー:', err);
    res.status(500).json({ error: err.message });
  }
};

// 複数メッセージを既読にする
exports.markMultipleAsRead = async (req, res) => {
  try {
    const { messageIds } = req.body;
    
    await db.Message.update(
      { read: true },
      { where: { id: messageIds } }
    );
    
    res.json({
      success: true,
      message: `${messageIds.length}件のメッセージを既読にしました`
    });
  } catch (err) {
    console.error('一括既読処理エラー:', err);
    res.status(500).json({ error: err.message });
  }
};

// 全メッセージを既読にする
exports.markAllAsRead = async (req, res) => {
  try {
    const { profileId } = req.params;
    
    const result = await db.Message.update(
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
      message: `全メッセージを既読にしました（${result[0]}件）`
    });
  } catch (err) {
    console.error('全既読処理エラー:', err);
    res.status(500).json({ error: err.message });
  }
};

// メッセージをフォルダに移動
exports.moveToFolder = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { folder } = req.body;
    
    const message = await db.Message.findByPk(messageId);
    if (!message) {
      return res.status(404).json({ error: 'メッセージが見つかりません' });
    }
    
    message.folder = folder;
    await message.save();
    
    res.json({
      success: true,
      message: `「${folder}」に移動しました`,
      data: message
    });
  } catch (err) {
    console.error('フォルダ移動エラー:', err);
    res.status(500).json({ error: err.message });
  }
};

// 複数メッセージをフォルダに移動
exports.moveMultipleToFolder = async (req, res) => {
  try {
    const { messageIds, folder } = req.body;
    
    await db.Message.update(
      { folder },
      { where: { id: messageIds } }
    );
    
    res.json({
      success: true,
      message: `${messageIds.length}件のメッセージを「${folder}」に移動しました`
    });
  } catch (err) {
    console.error('一括フォルダ移動エラー:', err);
    res.status(500).json({ error: err.message });
  }
};

// 未読数取得
exports.getUnreadCount = async (req, res) => {
  try {
    const { profileId } = req.params;
    
    const count = await db.Message.count({
      where: {
        toProfileId: profileId,
        read: false
      }
    });
    
    res.json({ success: true, count });
  } catch (err) {
    console.error('未読数取得エラー:', err);
    res.status(500).json({ error: err.message });
  }
};
