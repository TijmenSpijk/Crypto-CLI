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
            const res = await api.getPriceData(cmd.coin, cmd.cur, cmd.int);
            const output = this.formatData(res, cmd.int, cmd.cur);

            console.log(output);
        } catch (error) {
            console.error(error.red);
        }
    },
    formatData(data, intervals, currency) {
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
}

module.exports = check;