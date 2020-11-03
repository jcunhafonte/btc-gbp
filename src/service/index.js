export const baseURL = '/v1/pubticker';

export const getPrices = () => {
    return fetch(`${baseURL}/btcgbp`)
        .then(response => response.json())
        .catch(error => error);
};