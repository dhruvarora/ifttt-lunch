#!/usr/bin/env node

/* Necesary NPM Modules */
var program = require('commander');
var chalk = require('chalk');

/* Local files for better modulation */
var add = require('./commands/add.js');
var generate = require('./commands/generate.js');
var view = require('./commands/view.js');
var tree = require('./commands/tree.js');

program
  .version(require('./package.json').version);

program
  .command('add')
  .description('Add a team or member to the organization')
  .action(add);

program
  .command('generate')
  .description('Generate 1+1 pairings')
  .action(generate);

program
  .command('view')
  .description('View the last generated set of pairings')
  .action(view);

program
  .command('orgtree')
  .description('View the organization tree')
  .action(tree);

program.parse(process.argv);

if (!program.args.length) {
  console.log(chalk.green('\n  Welcome to the IFTTT Lunch Pairer!'));
  console.log(chalk.green('  ----------------------------------'));
  program.help();
  process.exit();  
}
