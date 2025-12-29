const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/', profileController.create);
router.get('/', profileController.getAll);
router.post('/search', profileController.search);
router.get('/:id', profileController.getById);
router.put('/:id', profileController.update);

module.exports = router;
