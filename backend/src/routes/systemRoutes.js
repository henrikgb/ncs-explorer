const express = require('express');
const controller = require('../controllers/systemController');

const router = express.Router();

router.get('/message', controller.getMessage);
router.get('/health', controller.getHealth);

module.exports = router;