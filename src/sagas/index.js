import {FETCHED_PRICES, requestPrices, requestPricesError, requestPricesSuccess} from "../actions";
import {call, put, takeEvery} from "redux-saga/effects";
import {getPrices} from "../service";

export function* watchFetchPrices() {
    yield takeEvery(FETCHED_PRICES, fetchPricesAsync);
}

export function* fetchPricesAsync() {
    try {
        yield put(requestPrices());
        const data = yield call(getPrices);
        yield put(requestPricesSuccess(data));
    } catch (error) {
        yield put(requestPricesError());
    }
}