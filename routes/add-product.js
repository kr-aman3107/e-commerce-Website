const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
// Add product to cart
router.post('/add-to-cart', cartController.postCart);
module.exports = router;