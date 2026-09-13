const express = require('express');
const controller = require('../controllers/sodirController');

const router = express.Router();
router.get('/fields', controller.listFields);

module.exports = router;
