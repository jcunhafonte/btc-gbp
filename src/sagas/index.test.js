import { put } from 'redux-saga/effects';

import {getPrices} from '../service';
import {fetchPricesAsync} from './index';
import {requestPrices, requestPricesSuccess} from '../actions';

const stepper = fn => mock => fn.next(mock).value;

describe('Sagas', () => {
    it('should handle getPrices()', () => {
        const response = getPrices();
        const step = stepper(fetchPricesAsync(getPrices));

        expect(step()).toEqual(put(requestPrices()));
        step(response);
        expect(step()).toEqual(put(requestPricesSuccess(undefined)));
    });
});