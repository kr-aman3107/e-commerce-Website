const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');



const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);

app.listen(3000);
