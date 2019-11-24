import Product from '../model/Product';
import {
    BakeryService
} from '../service/BakeryService';

class BakeryHandler {

    constructor() {
        this.bakeryService = new BakeryService();
    }

    readItems(bakeryItems) {
        if (bakeryItems === undefined || bakeryItems === '') {
            throw new Error('Please provide valid input');
        }
        let itemsList = bakeryItems.split('/n');
        return itemsList.map(eachDetail => {
            let item = eachDetail.split(' ');
            return new Product(item[0], item[1]);
        });
    }

    checkoutItems(productList) {
        if (orders.length <= 0) {
            console.log('There are no orders to checkout');
        } else {
            productList.forEach(product => {
                try {
                    let {
                        totalPrice,
                        breakdown
                    } = this.bakeryService.getProductPrice(product.code, product.qty);
                    console.log(`${product.quantity} ${product.code} $${totalPrice.toFixed(2)}`);
                    Object.keys(breakdown || {}).forEach(each => {
                        let bk = breakdown[each];
                        console.log(`\t ${bk.quantity} x ${bk.name}`);
                    });
                    //     let {
                    //         totalPrice,
                    //         packs
                    //     } = await this.bakeryService.getProductInPacks(product);
                    //     if (packs.length > 0) {
                    //         console.log(`${product.code} ${product.quantity} '$'${totalPrice}`);
                    //         packs.map(eachPack => {
                    //             console.log(`\t ${eachPack.quantity} x ${eachPack.pack} ${eachPack.price}`);
                    //         })
                    //     } else {
                    //         console.log('Unable to fetch minimum packs for the given product : ', product);
                    //     }
                } catch (error) {
                    return error;
                }
            });
        }
    }
}

export {
    BakeryHandler
}