const fs = require('fs');
const path = require('path');

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
    constructor(t) {
        this.title = t;
    }
    save() {
        this.id=Math.random().toString();
        readFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
    static fetchAll(cb) {
        readFromFile(cb);
    }
    static findById(id,cb){
        readFromFile(products =>{
            const product = products.find(p => p.id===id);
            cb(product);
        });
    }
}