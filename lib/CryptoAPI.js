const axios = require('axios');
const colors = require('colors');

class CryptoAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://api.nomics.com/v1/currencies/ticker';
    }

    async getPriceData(coinOption, currencyOption, intervalOption) {
        try {
            const res = await axios.get(`${this.baseURL}?key=${this.apiKey}&ids=${coinOption}&convert=${currencyOption}&interval=${intervalOption}`);
            return res.data;
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = CryptoAPI;