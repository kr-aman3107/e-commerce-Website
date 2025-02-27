const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const app = express();
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const shopRoute = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    User.findByPk(1)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });
const adminRouter = require('./routes/admin');
const prodRouter = require('./routes/add-product');

const cartRouter = require('./routes/cart');  
app.use(prodRouter);

app.use(adminRouter);
app.use(cartRouter);  
app.use(shopRoute);

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'success.html'));
});
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product)
User.hasOne(Cart);

Cart.belongsTo(User);
Cart.belongsToMany(Product, {through : CartItem});
Product.belongsToMany(Cart, {through: CartItem});

sequelize.sync()
  .then(result => {
    console.log("Database synced");
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      console.log("No user found, creating a new user");
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    console.log("User found:", user);
    return user;
  })
  .then(user => {
    return user.createCart();
  })
  .then(cart => {
    console.log("Cart created, starting the server");
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch(err => {
    console.error("Error starting the server:", err);
  });