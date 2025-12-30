const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/', profileController.getAllProfiles);
router.get('/:id', profileController.getProfile);
router.post('/', profileController.createProfile);
router.put('/:id', profileController.updateProfile);  // ✅ 追加
router.delete('/:id', profileController.deleteProfile);

module.exports = router;
