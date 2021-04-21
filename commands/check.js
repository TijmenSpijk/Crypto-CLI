const inquirer = require('inquirer');
const colors = require('colors');
const KeyManager = require('../lib/KeyManager');
const CryptoAPI = require('../lib/CryptoAPI');
const { isRequired } = require('../utils/validation');

const check = {
    async price(cmd) {
        try {
            keyManager = new KeyManager();
            const key = keyManager.getKey();

            const api = new CryptoAPI(key);
            var intervals = checkInterval(cmd.int);
            const res = await api.getPriceData(cmd.coin, cmd.cur, intervals);
            const output = formatData(res, intervals, cmd.cur);

            console.log(output);
        } catch (error) {
            handleAPIError(error);
        }
    }
}

function checkInterval(intervals) {
    const interval = intervals.split(',');
    var valid = ''
    interval.forEach(int => {
        if (['1d','7d','30d','365d'].includes(int)) {
            valid += int + ','
        }
    });
    return valid.substring(0, valid.length-1);
}

function formatData(data, intervals, currency) {
    const interval = intervals.split(',')
    var output = '';

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    })

    data.forEach(coin => {
        output += `Coin: ${coin.symbol.yellow} (${coin.name}) | Price: ${formatter.format(coin.price).green} | High: ${formatter.format(coin.high).blue} `;
        
        interval.forEach(int => {
            let priceChange = coin[int].price_change;
            priceChange = formatter.format(priceChange);
            priceChange = priceChange[0] == '-' ? priceChange.red : priceChange.green;

            let priceChangePTC = coin[int].price_change_pct;
            priceChangePTC = priceChangePTC[0] == '-' ? priceChangePTC.red : priceChangePTC.green;

            output += `| Change (${int}) ${priceChange} (${priceChangePTC})`
        });
        
        output += '\n'
    });
    return output;
}

function handleAPIError(error) {
    if (error.respondse.status === 401) {
        throw new Error('Invalid API Key -- Go to https://nomics.com');
    } else if (error.respondse.status === 404) {
        throw new Error('API is not responding -- Go to https://nomics.com');
    } else {
        throw new Error('Oops something went wrong');
    }
}

module.exports = check;