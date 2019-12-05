const ProductPackService = require('../ProductPackService');

jest.mock('../../model/Pack');

describe('ProductPackService', () => {
    let productPackService;

    beforeEach(() => {
        productPackService = new ProductPackService();
    });

    it('should return null when bakeryMeta is undefined', () => {
        const bakeryMeta = productPackService.getProductPackOptions();
        expect(bakeryMeta).toEqual(null);
    });

    it('should get profuct pack options', () => {
        const bakeryMeta = {
            packs: [1,2]
        }
        const bakeryMetaResponse = productPackService.getProductPackOptions(bakeryMeta);
        expect(bakeryMetaResponse).toEqual([1,0]);
    });

    it('should calcuatePacks ', () => {
        const bakeryMeta = {
            packs: [1,2]
        }
        const bakeryMetaResponse = productPackService.getProductPackOptions(bakeryMeta);
        expect(bakeryMetaResponse).toEqual([1,0]);
    });
});
