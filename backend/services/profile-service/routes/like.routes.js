const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

router.post('/', likeController.sendLike);
router.get('/:profileId', likeController.getReceivedLikes);

module.exports = router;
