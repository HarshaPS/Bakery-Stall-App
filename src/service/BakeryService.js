import BakeryData from '../client/BakeryClient.json';
import {
    ProductPackService
} from './ProductPackService';

class BakeryService {

    constructor() {
        this.productPackService = new ProductPackService();
    }

    getProductPrice(productCode, quantity) {
        let bakeryMetaData = this.getProductMetadata(productCode);
        let productPackOptions = this.productPackService.getProductPackOptions(bakeryMetaData);
        if (isNaN(+quantity) || quantity < 1) {
            throw new Error(`Invalid quantity: ${quantity}`);
        }
        if (!productPackOptions || productPackOptions.length === 0) {
            throw new Error(`Product not found by the code: ${productCode}`);
        }
        let packResult = this.productPackService.calcuatePacks(productPackOptions, quantity);
        if (packResult.isPackNotAvailable()) {
            throw new Error('Cannot create packs for ' + quantity + ', please try another quantity.');
        }
        return this.calculateProductPrice(productCode, packResult);
    }

    calculateProductPrice(productCode, packResult) {
        let bakeryProductMeta = this.getProductMetadata(productCode);
        let totalPackResult = {
            productCode,
            quantity: 0,
            breakdown: {},
            totalPrice: 0,
        };
        packResult && packResult.getPacks().forEach(each => {
            let key = `${each}`;
            totalPackResult.quantity += each;
            totalPackResult.totalPrice += bakeryProductMeta.packs[key];
            totalPackResult.breakdown[key] = totalPackResult.breakdown[key] || {
                quantity: 0,
                name: `${key} $${bakeryProductMeta.packs[key].toFixed(2)}`
            };
            totalPackResult.breakdown[key].quantity++;
        });
        return totalPackResult;
    }

    getProductMetadata(code) {
        return BakeryData[code];
    }

}


export {
    BakeryService
}