import React from 'react';

import {
    FETCHED_PRICES,
    REQUESTED_PRICES,
    REQUESTED_PRICES_FAILED,
    REQUESTED_PRICES_SUCCEEDED,
    requestPrices,
    requestPricesError,
    requestPricesSuccess,
    fetchPrices
} from "./index";

describe('Actions', () => {
    it('should check requestPrices() type', () => {
        expect(requestPrices().type).toBe(REQUESTED_PRICES);
    });

    it('should check requestPricesSuccess() type', () => {
        expect(requestPricesSuccess().type).toBe(REQUESTED_PRICES_SUCCEEDED);
    });

    it('should check requestPricesError() type', () => {
        expect(requestPricesError().type).toBe(REQUESTED_PRICES_FAILED);
    });

    it('should check fetchPrices() type', () => {
        expect(fetchPrices().type).toBe(FETCHED_PRICES);
    });
});
