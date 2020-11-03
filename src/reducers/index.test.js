import React from 'react';
import reducer from "./index";
import {requestPrices, requestPricesError, requestPricesSuccess} from "../actions";

describe('Reducer', () => {
    let initialState = {};

    beforeEach(() => {
        initialState = {
            prices: [],
            fetching: false,
            error: false
        };
    });

    it('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle REQUESTED_PRICES', () => {
        const action = requestPrices();
        const expectedState = {
            prices: [],
            fetching: true,
            error: false
        };

        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle REQUESTED_PRICES_SUCCEEDED', () => {
        const date = new Date();
        const data = {last_price: 5000.20, date};
        const action = requestPricesSuccess(data);
        const expectedState = {
            prices: [{value: data.last_price, date}],
            fetching: false,
            error: false
        };

        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle REQUESTED_PRICES_FAILED', () => {
        const action = requestPricesError();
        const expectedState = {
            prices: [],
            fetching: false,
            error: true
        };

        expect(reducer(initialState, action)).toEqual(expectedState);
    });
});
