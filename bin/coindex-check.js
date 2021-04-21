const program  = require('commander');
const check = require('../commands/check');

program.command('price')
       .description('Check the price of a Cryptocoin')
       .option('--coin <type>', 'Get specific coin (CSV Format)', 'BTC')
       .option('--cur <currency', 'Change the currency', 'EUR')
       .option('--int <interval>', 'Set the interval fo the data (1d, 7d, 30d, 365d)', '1d')
       .action((cmd) => check.price(cmd));

program.parse(process.argv);