#!/usr/bin/env node
var program = require('commander'),
  async = require('async'),
  authenticate = require('./util/functions').authenticate,
  wordDef = require('./util/functions').wordDefinition,
  wordSynonym = require('./util/functions').wordSynonym,
  wordAntonym = require('./util/functions').wordAntonym,
  wordExamples = require('./util/functions').wordExamples;

function wordAllDetails (word) {
  async.series({
    one: function(callback) {
      wordDef(word, function (err, snippet) {callback(null, 1);});
    },
    two: function(callback){
        wordSynonym(word, function (err, snippet) { callback(null, 2)});
    },
    three: function (callback) {
      wordAntonym(word, function (err, snippet) { callback(null, 3)});
    },
    four: function (callback) {
      wordExamples(word, function (err, snippet) { callback (null, 4)});
    }
  }, function(err, results) {
      if(err) { console.log('Something Wrong'); }
  });
};

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
  .action(word => wordDef(word, function (err,snippet) {}));

program
  .version('0.0.1')
  .command('syn <word>')
  .description('Synonyms for a word')
  .action(word => wordSynonym(word, function (err,snippet) {}));

program
  .version('0.0.1')
  .command('ant <word>')
  .description('Antonyms for a word')
  .action(word => wordAntonym(word, function (err,snippet) {}));

program
  .version('0.0.1')
  .command('dict <word>')
  .description('Examples for a word')
  .action(word => wordAllDetails(word, function (err,snippet) {}));

program.parse(process.argv);