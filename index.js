#!/usr/bin/env node

/* Necesary NPM Modules */
var program = require('commander');
var chalk = require('chalk');

/* Local files for better modulation */
var add = require('./add.js');
var generate = require('./generate.js');
var view = require('./view.js');
var tree = require('./tree.js');

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
  .command('tree')
  .description('View the organization tree')
  .action(tree);

program.parse(process.argv);
