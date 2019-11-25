const BakeryStall = require('./index.js');
const BakeryHandler = require('./src/handler/BakeryHandler');

describe('Bakery Stall', () => {
    it('it should successfully process the products', () => {
        const read = BakeryHandler.prototype.readItems = jest.fn().mockResolvedValue({
            'some-data':'abc'
        });
        const execute = BakeryHandler.prototype.checkoutItems = jest.fn().mockResolvedValue({
            'some-data':'abc'
        });
        const bakeryStall = new BakeryStall();
        bakeryStall.processOrders();
        expect(read).toBeCalled();
        expect(execute).toBeCalled();
    });

    it('it should successfully fail to process the products', () => {
        BakeryHandler.prototype.readItems = jest.fn().mockImplementationOnce(() => Promise.reject(value));
        BakeryHandler.prototype.checkoutItems = jest.fn().mockImplementationOnce(() => Promise.reject(value));
        const bakeryStall = new BakeryStall();
        let result;
        try {
            result = bakeryStall.processOrders();
        } catch (error) {
            result = error;
        }
        
        expect(result).toBeInstanceOf(Error);
    })
})