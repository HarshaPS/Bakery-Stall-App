import BakeryData from '../client/BakeryClient.json';
import {ProductPackService} from './ProductPackService';
import {Pack} from '../model/Pack';

class BakeryService {

    constructor(){
        this.productPackService = new ProductPackService();
    }

    // async getProductInPacks(product) {
    //     let {
    //         code,
    //         quantity
    //     } = product;

    //     let productPacks = await this.getProductPacks(code);
    //     if (quantity < productPacks[-1]) {
    //         throw new Error('Invalid quantity');
    //     } else {
    //         let productPacksObj = [];
    //         let remainingPacks = 0;
    //         let totalPrice = 0;

    //         for (let i = 0; i < productPacks.legnth; i++) {
    //             let packQty = 0;
    //             if (quantity > productPacks[i]) {
    //                 let price = await this.getPackPrice(code, productPacks[i].toString());
    //                 packQty = quantity / productPacks[i];
    //                 remainingPacks = quantity % productPacks[i];

    //                 productPacksObj.push({
    //                     "pack": productPacks[i].toString(),
    //                     "quantity": packQty,
    //                     "price": price
    //                 });

    //                 totalPrice += packQty * price;
    //                 if (remainingPacks === 0) {
    //                     break;
    //                 } else {

    //                 }
    //             }
    //         }

    //         return {
    //             "totalPrice": totalPrice,
    //             "packs": productPacksObj
    //         }
    //     }
    // }

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
        return this.calculatePackPrice(productCode, packResult);
    }

    calculateProductPrice(productCode, packResult) {
        let bakeryProductMeta = this.getProductMetadata(code);
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
                name: `${key} $ ${bakeryProductMeta.packs[key].toFixed(2)}`
            };
            totalPackResult.breakdown[key].quantity++;
        });
        return totalPackResult;
    }

    async getProductMetadata(code) {
        return BakeryData[code];
    }

    async getProductPacks(code) {
        let bakery = this.getBakeryMetadata(code);
        return bakery ? Object.keys(bakery.packs).map(x => {
            return parseInt(x);
        }).sort((a, b) => {
            return b - a;
        }) : null;
    }

    async getPackPrice(code, pack) {
        let bakery = this.getBakeryMetadata(code);
        let packs = bakery.packs;
        return packs[pack];
    }

    getMinPacks(originalQty, packs) {
        let incQty = 0,
            decQty = 0;
        if (originalQty >= packs[0]) {
            let tempQuotient = 0;
            let rem = 0;
            tempQuotient = originalQty / packs[0];
            rem = originalQty % packs[0];
            while (rem !== 0) {

            }
        } else {
            return {}
        }

    }

}


export {
    BakeryService
}