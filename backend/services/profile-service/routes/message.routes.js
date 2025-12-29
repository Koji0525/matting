const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// 基本機能
router.post('/', messageController.sendMessage);
router.get('/:profileId', messageController.getMessages);

// 既読機能
router.patch('/:messageId/read', messageController.markAsRead);
router.post('/mark-multiple-read', messageController.markMultipleAsRead);
router.post('/:profileId/mark-all-read', messageController.markAllAsRead);
router.get('/:profileId/unread-count', messageController.getUnreadCount);

// フォルダ機能
router.patch('/:messageId/folder', messageController.moveToFolder);
router.post('/move-multiple-folder', messageController.moveMultipleToFolder);

module.exports = router;
