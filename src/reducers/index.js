import {REQUESTED_PRICES, REQUESTED_PRICES_FAILED, REQUESTED_PRICES_SUCCEEDED} from "../actions";

const initialState = {
    prices: [],
    fetching: false,
    error: false
};

const reducer = (state = initialState, action) => {
    const prices = state.prices;

    switch (action.type) {
        case REQUESTED_PRICES:
            return {
                prices,
                fetching: true,
                error: false
            };
        case REQUESTED_PRICES_SUCCEEDED:
            const value = action.payload.last_price;

            return {
                prices: [
                    ...prices,
                    {
                        date: new Date(),
                        value
                    }
                ],
                fetching: false,
                error: false
            };
        case REQUESTED_PRICES_FAILED:
            return {
                prices,
                fetching: false,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;