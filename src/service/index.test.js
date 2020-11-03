import {getPrices} from "./index";

describe('Service', () => {
    const prices = {
        last_price: 1
    };
    const error = 'service down';

    it("should get response", async () => {
        window.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve({
                    ok: true,
                    json: () => prices
                });
            });
        });

        const response = await getPrices();

        expect(response).toEqual(prices)
    });

    it("should get error", async () => {
        window.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                reject({
                    status: 400,
                    ok: false,
                    error: 'service down'
                });
            });
        });
        const response = await getPrices();

        expect(response.error).toEqual(error)
    });
});
