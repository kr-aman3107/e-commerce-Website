const Cart = require('../models/cart');
const Product = require('../models/product');

exports.postCart = (req,res)=>{
    const productId = req.body.productId;
    Product.findById(productId, product =>{
        if (product) {
            Cart.addProduct(productId, product.price, () => {
                res.redirect('/');  // Redirect or send response as needed
            });
        } else {
            res.redirect('/'); // Handle product not found scenario
        }
    })
}
exports.getCart = (req, res) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(p => p.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            let html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your Cart</title>
                <link rel="stylesheet" href="/css/main.css">
            </head>
            <body>
                <h1>Your Cart</h1>
                <ul>`;
            
            cartProducts.forEach(cp => {
                html += `<li>${cp.productData.title} (Quantity: ${cp.qty})</li>`;
            });

            html += `
                </ul>
                <a href="/">Back to shop</a>
            </body>
            </html>`;
            
            res.send(html);
        });
    });
};
