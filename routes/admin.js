const path = require('path');
const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');
router.get('/add-product',adminController.getAddProduct);
router.post('/add-product',adminController.postAddProduct);
router.get('/',adminController.getAllProducts);

module.exports = router;
