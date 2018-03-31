#!/usr/bin/env node
var program = require('commander'),
  authenticate = require('./util/functions').authenticate,
  wordDef = require('./util/functions').wordDefinition;

program
  .version('0.0.1')
  .command('auth')
  .description('Definition for a word')
  .option('-a, --all','List all files and folders')
  .option('-l, --long','')
  .action(authenticate);

program
  .version('0.0.1')
  .command('def <word>')
  .description('Definition for a word')
  .action(word => wordDef(word));

program.parse(process.argv);