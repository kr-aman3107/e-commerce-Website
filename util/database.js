
const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('onlineshoptemp', 'root', 'aman',{
    host: 'localhost',
    dialect : 'mysql', 
});

module.exports = sequelize;