const express = require('express');
const controller = require('../controllers/dummyjsonController');

const router = express.Router();
router.get('/products', controller.listProducts);
router.get('/products/:id', controller.getProduct);
router.get('/users', controller.listUsers);

module.exports = router;