const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController')

router.get('/cart',cartController.getCart);
router.post('/add-to-cart',cartController.postCart);

module.exports = router;