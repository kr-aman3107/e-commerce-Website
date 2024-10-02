const path = require('path');
const Product = require('../models/product');
exports.getIndex = (req,res,next) =>{
    res.sendFile(path.join(__dirname,'../','views','shop.html'));
}

exports.getProduct = (req,res,next) =>{
    const prodId = req.params.productId;
    Product.findById(prodId,Product => {
        res.render('/product-details',{product : product , path: '/products'});
    });
};