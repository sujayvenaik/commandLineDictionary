#!/usr/bin/env node
var program = require('commander'),
  async = require('async'),
  prompt = require('inquirer').prompt,
  authenticate = require('./util/functions').authenticate,
  wordDef = require('./util/functions').wordDefinition,
  wordSynonym = require('./util/functions').wordSynonym,
  wordAntonym = require('./util/functions').wordAntonym,
  wordExamples = require('./util/functions').wordExamples,
  wordOfTheDay = require('./util/functions').wordOfTheDay;

function wordAllDetails (word) {
  async.series({
    one: function(callback) {
      wordDef(word, function (err, snippet) { console.log(snippet); callback(null, 1);});
    },
    two: function(callback){
        wordSynonym(word, function (err, snippet) { console.log(snippet); callback(null, 2)});
    },
    three: function (callback) {
      wordAntonym(word, function (err, snippet) { console.log(snippet); callback(null, 3)});
    },
    four: function (callback) {
      wordExamples(word, function (err, snippet) { console.log(snippet); callback (null, 4)});
    }
  }, function(err, results) {
      if(err) { console.log('Something Wrong'); }
  });
};

program
  .version('0.0.1')
  .command('def <word>')
  .description('Definition for a word')
  .action(word => wordDef(word, function (err,snippet) {console.log(snippet);}));

program
  .version('0.0.1')
  .command('syn <word>')
  .description('Synonyms for a word')
  .action(word => wordSynonym(word, function (err,snippet) {console.log(snippet);}));

program
  .version('0.0.1')
  .command('ant <word>')
  .description('Antonyms for a word')
  .action(word => wordAntonym(word, function (err,snippet) {console.log(snippet);}));

program
  .version('0.0.1')
  .command('dict <word>')
  .description('All details for a word')
  .action(word => wordAllDetails(word, function (err,snippet) {console.log(snippet);}));

program
  .version('0.0.1')
  .command('wotd')
  .description('Details for word of the day')
  .action(function() { wordOfTheDay(function (err, word){ wordAllDetails(word);})});

program
  .version('0.0.1')
  .command('play')
  .description('Let\'s play a game')
  .action(function() { wordOfTheDay(function (err, word) {
    console.log('Guess the word:\n');
    wordDef(word, function (err, snippet) {
      console.log(snippet);
      prompt([
        {type: 'input', name: 'word', message: 'Enter your answer'}
      ]).then(answer => {
        if( answer.word===word ){ console.log('Correct') }
        else { wordAntonym(word, function (err, snippet) { console.log(snippet); })}
      })
    });
  }
  )});

program.parse(process.argv);