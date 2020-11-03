const express = require('express');
const proxy = require('http-proxy-middleware');

let app = express();

const target = 'https://api.bitfinex.com';
const endpoint = '/v1/pubticker';

app.use(endpoint, proxy(
    {
        target,
        changeOrigin: true
    }
));
app.listen(9000);