const Pack = require('../model/Pack');

class ProductPackService {

    constructor() {
        this.minPack = {};
    }

    getProductPackOptions(bakeryMeta) {
        return bakeryMeta ? Object.keys(bakeryMeta.packs).map(x => {
            return parseInt(x);
        }).sort((a, b) => {
            return b - a;
        }) : null;
    }

    calcuatePacks(productPacks, quantity) {
        let localStorageKey = `${quantity}#${JSON.stringify(productPacks)}`;
        let localStorage = this.minPack[localStorageKey];
        if (localStorage) {
            return new Pack(localStorage);
        }
        let minResult, minPack;
        let packResult = new Pack();
        for (let idx in (productPacks || [])) {
            let p = productPacks[idx];
            if (quantity === p) {
                packResult.setPackQuantity(1);
                packResult.addPack(p);
                break;
            } else if (quantity > p) {
                let subresult = this.calcuatePacks(productPacks, quantity - p);
                if (!subresult.isPackNotAvailable()) {
                    if (!minResult || minResult.getPackQuantity() > subresult.getPackQuantity())
                        minResult = subresult, minPack = p;
                } else {
                    packResult.setPackQuantityNotAvailable();
                }
            } else {
                packResult.setPackQuantityNotAvailable();
            }
        }
        packResult.mergeSubPack(minResult, minPack);
        this.minPack[localStorageKey] = Object.assign({}, packResult);
        return packResult;
    }

}

module.exports = ProductPackService;