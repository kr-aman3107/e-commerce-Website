const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'product.json'
);

const readFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });

}
module.exports = class Product {
    constructor(title ,imageUrl, price, id) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.id = id;
    }
    save() {
        const p = path.join(rootDir,'Data', 'products.json');
        this.id=Math.random().toString();
        fs.readFile(p,(err,fileContent) =>{
            let products = [];
            if(!err){
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products),(err) =>{
                console.log(err);
            });
        });
        // this.id=Math.random().toString();
        // readFromFile(products => {
        //     products.push(this);
        //     fs.writeFile(p, JSON.stringify(products), (err) => {
        //         if (err) {
        //             console.log(err);
        //         }
        //     });
        // });
    }
    static fetchAll(cb) {
        //readFromFile(cb);
        const p = path.join(rootDir,'Data', 'products.json');
        fs.readFile(p,(err,fileContent) =>{
            if(err){
                cb([]);
            }else{
                cb(JSON.parse(fileContent));
            }
        });
    }
    static findById(id,cb){
        const p = path.join(rootDir,'Data', 'products.json');
        fs.readFile(p,(err,fileContent) =>{
            if(err){
                cb(null);
            }else{
                const products = JSON.parse(fileContent);
                const product = products.find(prod => prod.id === id);
                cb(product);
            }
        });
        // readFromFile(products =>{
        //     const product = products.find(p => p.id===id);
        //     cb(product);
        // });
    }
}

