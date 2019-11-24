import { readFileSync } from 'fs';
import { BakeryHandler } from './src/handler/BakeryHandler';

class BakeryStall {

    constructor() {
        this.bakeryHandler = new BakeryHandler();
    }
    async processOrders() {
        try {
            const inputBuffer = readFileSync('./Input.txt');
            const productsList = await this.bakeryHandler.readItems(inputBuffer.toString());
            this.bakeryHandler.checkoutItems(productsList);
        } catch (error) {
            console.log('Error occured while processing orders ', error);
            return error;
        }
    }
}

const bakeryStall = new BakeryStall
bakeryStall.processOrders();

