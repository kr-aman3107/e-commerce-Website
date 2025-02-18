const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const app = express();
const Product = require('./models/product');
const User = require('./models/user');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
const adminRouter = require('./routes/admin');
const prodRouter = require('./routes/add-product');

const cartRouter = require('./routes/cart');  
app.use(prodRouter);

app.use(adminRouter);
app.use(cartRouter);  
app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'success.html'));
});
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product)

sequelize
.sync({force: true})
.then(result =>{
    app.listen(3001);
})
.catch(err =>{
    console.log(err);
});