const Product = require("../models/product");

const path = require('path');
const rootDir = require('../util/path');


exports.getAllProducts = (req, res, next) => {
    Product.fetchAll(products => {
        let html = `
         <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>All Products</title>
            <link rel="stylesheet" href="/css/main.css">
        </head>
        <body>
            <h1>All Products</h1>
            <ul>
        `;
        products.forEach(product => {
            html += `
                <li>
                    ${product.title}
                    <form action="/add-to-cart" method="POST">
                        <input type="hidden" name="productId" value="${product.id}">
                        <button type="submit">Add to Cart</button>
                    </form>
                </li>`;
        });

        html += `
            </ul>
            </body>
            </html>
        `;

        res.send(html);
    });
};

exports.getAddProduct = (req,res,next) =>{
     res.sendFile(path.join(rootDir,'views','add-product.html'));

}
exports.postAddProduct = (req,res) =>{
    const product = new Product(req.body.title);
    console.log(req.body);
    console.log(product);       
    product.save();
    res.redirect('/');
    // console.log('successful');
    // res.send(`<html><h1>hiwedii</h1></html>`)

} 