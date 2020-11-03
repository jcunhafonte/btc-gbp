import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import {watchFetchPrices} from "../sagas";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchFetchPrices);
