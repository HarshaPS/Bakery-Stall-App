const BakeryService = require('../Bakery');
const ProductPackService = require('../ProductPack');

jest.mock('../../model/Pack');

describe('BakeryService', () => {
    let bakeryService;

    beforeEach(() => {
        bakeryService = new BakeryService();
    });

    it('should return object with name Vegemite Scroll for code VS5', () => {
        const expectedOutput = {"name": "Vegemite Scroll", "packs": {"3": 6.99, "5": 8.99}}
        const meta = bakeryService.getProductMetadata('VS5');
        expect(meta).toEqual(expectedOutput);
    });

    it('should expect/return pack options [5, 3] and calulatePacks for code VS5', () => {
        const packOption = ProductPackService.prototype.getProductPackOptions = jest.fn().mockResolvedValue(
            [5,3]
        );
        const price = ProductPackService.prototype.calcuatePacks = jest.fn().mockResolvedValue("some-data");
        try {
            bakeryService.getProductPrice('VS5', 10);
        } catch (error) {
            expect(packOption).toBeCalled();
            expect(price).toBeCalled();
        }
        
    });

    it('should return error pack options for code VS5', () => {
        try {
            bakeryService.getProductPrice('VS5', "abc10");
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual("Invalid quantity: abc10");
        }
    });

    it('should return error invalid pack', () => {
        ProductPackService.prototype.getProductPackOptions = jest.fn().mockResolvedValue([]);
        try {
            bakeryService.getProductPrice('VS5', 10);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
        
    });

});