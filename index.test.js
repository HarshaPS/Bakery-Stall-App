
const BakeryStall = require('./index.js').BakeryStall;
const BakeryHandler = require('./src/handler/BakeryHandler').BakeryHandler;

describe('Bakery Stall', () => {
    it('it should successfully process the products', () => {
        const bakeryHandler = new BakeryHandler();
        bakeryHandler.readItems = jest.fn().mockResolvedValue({
            'some-data':'abc'
        });
        bakeryHandler.checkoutItems = jest.fn().mockResolvedValue({
            'some-data':'abc'
        });
        const bakeryStall = new BakeryStall();
        bakeryStall.processOrders();
        expect(BakeryHandler.readItems).toBeCalled();
        expect(BakeryHandler.checkoutItems).toBeCalled();
    })
})