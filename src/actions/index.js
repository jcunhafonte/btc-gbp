export const REQUESTED_PRICES = 'REQUESTED_PRICES';
export const REQUESTED_PRICES_SUCCEEDED = 'REQUESTED_PRICES_SUCCEEDED';
export const REQUESTED_PRICES_FAILED = 'REQUESTED_PRICES_FAILED';
export const FETCHED_PRICES = 'FETCHED_PRICES';

export const requestPrices = () => {
    return {type: REQUESTED_PRICES}
};

export const requestPricesSuccess = (data) => {
    return {type: REQUESTED_PRICES_SUCCEEDED, payload: data}
};

export const requestPricesError = () => {
    return {type: REQUESTED_PRICES_FAILED}
};

export const fetchPrices = () => {
    return {type: FETCHED_PRICES}
};