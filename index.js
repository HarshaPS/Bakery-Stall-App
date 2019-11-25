const { readFileSync } = require('fs');
const BakeryHandler = require('./src/handler/BakeryHandler');

class BakeryStall {

    constructor() {
        this.bakeryHandler = new BakeryHandler();
    }
    
    processOrders() {
        try {
            const inputBuffer = readFileSync('./Input.txt');
            const productsList = this.bakeryHandler.readItems(inputBuffer.toString());
            this.bakeryHandler.checkoutItems(productsList);
        } catch (error) {
            console.log('Error occured while processing orders ', error);
            return error;
        }
    }
}
module.exports = BakeryStall;

const bakeryStall = new BakeryStall
bakeryStall.processOrders();