const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

// 基本機能
router.post('/', likeController.sendLike);
router.get('/:profileId', likeController.getLikes);

// 既読機能
router.patch('/:likeId/read', likeController.markLikeAsRead);
router.post('/:profileId/mark-all-read', likeController.markAllLikesAsRead);
router.get('/:profileId/unread-count', likeController.getUnreadLikesCount);

module.exports = router;
