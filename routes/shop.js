const express = require('express');
const path = require('path');
const Product = require('../models/product');
const shopController = require('../controllers/shopController');
const router = express.Router();

router.get('/',shopController.getIndex);
router.get('/products/:productId',shopController.getProduct);