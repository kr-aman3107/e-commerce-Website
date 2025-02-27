const express = require('express');
const path = require('path');

const shopController = require('../controllers/shopController')

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/api/products', shopController.getProductData);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

 // Serves the cart.html file
 router.get('/api/cart-data', shopController.getCartData);
router.get('/cart', shopController.getCartPage);

module.exports = router;