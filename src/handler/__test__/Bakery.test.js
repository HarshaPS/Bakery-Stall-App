const BakeryHandler = require('../../handler/Bakery');
const BakeryService = require('../../service/Bakery');

describe('Bakery Handler', () => {
    it('it should successfully read the products', () => {
        const givenInput = "10 VS5\n14 MB11\n13 CF";
        const expectedOutput = [{
                code: 'VS5',
                quantity: '10'
            },
            {
                code: 'MB11',
                quantity: '14'
            },
            {
                code: 'CF',
                quantity: '13'
            }
        ]
        const handler = new BakeryHandler();
        let result = handler.readItems(givenInput);
        expect(result).toEqual(expectedOutput);
    });

    it('it should successfully read the products', () => {
        const givenInput = "";
        const handler = new BakeryHandler();
        let result
        try {
            result = handler.readItems(givenInput);
        } catch (error) {
            result = error;
        }
        expect(result).toBeInstanceOf(Error);
    });

    it('it should successfully checkout the products', () => {
        const givenInput = [{
                code: 'VS5',
                quantity: '19'
            },
            {
                code: 'MB11',
                quantity: '14'
            },
            {
                code: 'CF',
                quantity: '13'
            }
        ]
        const handler = new BakeryHandler();
        const mpckPrice = BakeryService.prototype.getProductPrice = jest.fn().mockResolvedValue({});
        handler.checkoutItems(givenInput);
        expect(mpckPrice).toBeCalled();
    });

    it('it should fail to checkout the products as error to be thrown by service', () => {
        const givenInput = [{
                code: 'VS5',
                quantity: '19'
            },
            {
                code: 'MB11',
                quantity: '14'
            },
            {
                code: 'CF',
                quantity: '13'
            }
        ]
        const handler = new BakeryHandler();
        BakeryService.prototype.getProductPrice = jest.fn().mockImplementationOnce(() => Promise.reject(new Error()));
        let result;
        try {
            result = handler.checkoutItems(givenInput);
        } catch (error) {
            result = error
        }
        expect(result).toEqual(undefined);
    });

    it('it should fail to checkout the products due to validation error', () => {
        const givenInput = []
        const handler = new BakeryHandler();
        let result;
        try {
            result = handler.checkoutItems(givenInput);
        } catch (error) {
            result = error
        }
        expect(result).toBeInstanceOf(Error);
    })
})