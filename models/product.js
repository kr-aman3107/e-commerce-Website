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
    // static fetchAll(cb) {
    //     const p = path.join(path.dirname(process.mainModule.filename),
    //         'data',
    //         'product.json'
    //     );
    //     fs.readFile(p, (err, fileContent) => {
    //         if (err || fileContent.length === 0) {
    //             cb([]); 
    //         } else {
    //             cb(JSON.parse(fileContent)); 
    //         }
    //     });
    // }

}