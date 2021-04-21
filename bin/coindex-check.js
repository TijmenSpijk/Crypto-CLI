const program  = require('commander');
const check = require('../commands/check');

program.command('price')
       .description('Check the price of a Cryptocoin')
       .option('--coin <type>', 'Get specific coin (CSV Format)', 'DOGE')
       .option('--cur <currency', 'Change the currency', 'EUR')
       .option('--int <interval>', 'Set the interval fo the data (1d, 7d, 30d, 365d, ytd)', '1d')
       .action((cmd) => check.price(cmd));

program.command('topten')
       .description('Check the price of the top 10 cryptocoins')
       .option('--cur <currency', 'Change the currency', 'EUR')
       .action((cmd) => check.topten(cmd))

program.parse(process.argv);