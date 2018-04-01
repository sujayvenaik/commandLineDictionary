var request = require("request"),
  _ = require('lodash');

module.exports = {
  
  /**
   * Used to get word definition for a word
   * @param  {String} word
   * @param  {Function} cb - callback
   * @returns {String}
   */
  wordDefinition : function  (word, cb) {
    var options = { method: 'GET',
      url: `http://api.wordnik.com:80/v4/word.json/${word}/definitions`,
      qs: 
      { limit: '200',
        includeRelated: 'true',
        useCanonical: 'false',
        includeTags: 'false',
        api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5' },
      headers: { } };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      cb(null, `The def for word is: \n${JSON.parse(body)[0].text}\n`);
    });

  },

  /**
   * Used to get synonyms for a word
   * @param  {String} word
   * @param  {Function} cb - callback
   * @returns {String}
   */
  wordSynonym : function (word, cb) {
    var options = { method: 'GET',
      url: `http://api.wordnik.com:80/v4/word.json/${word}/relatedWords`,
      qs: 
      { useCanonical: 'false',
        relationshipTypes: 'synonym',
        limitPerRelationshipType: '10',
        api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5' },
      headers:{ } };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      let snippet = `The Synonyms for the word are:\n`;
      if(JSON.parse(body)[0] && JSON.parse(body)[0].words){
        _.forEach(JSON.parse(body)[0].words, function(value) {
          snippet += value + '\n';
        });
      } else {
        snippet += 'No Synonyms\n';
      }
      cb(null, snippet);
    });

  },

  /**
   * Used to get antonyms for a word
   * @param  {String} word
   * @param  {Function} cb - callback
   * @returns {String}
   */
  wordAntonym : function (word, cb) {
    var options = { method: 'GET',
      url: `http://api.wordnik.com:80/v4/word.json/${word}/relatedWords`,
      qs: 
      { useCanonical: 'false',
        relationshipTypes: 'antonym',
        limitPerRelationshipType: '10',
        api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5' },
      headers:{ } };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      let snippet = `The Antonyms for the word are:\n`;
      if(JSON.parse(body)[0] && JSON.parse(body)[0].words){
        _.forEach(JSON.parse(body)[0].words, function(value) {
          snippet += value + '\n';
        });
      } else {
        snippet += 'No Antonyms\n';
      }
      cb(null, snippet);
    });

  },

  /**
   * Used to get examples for a word
   * @param  {String} word
   * @param  {Function} cb - callback
   * @returns {String}
   */
  wordExamples : function (word, cb) {
    var options = { method: 'GET',
      url: `http://api.wordnik.com:80/v4/word.json/${word}/examples`,
      qs: 
      { includeDuplicates: 'false',
        useCanonical: 'false',
        skip: '0',
        limit: '5',
        api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5' },
      headers: {} };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      let res = JSON.parse(body);
      let snippet = `The Examples for the word are:\n`;
      _.forEach(res.examples, function (value) {
        snippet += value.text + '\n';
      });
    cb(null, snippet);
  });
  },

  /**
   * Used to get word of the day
   * @param  {Function} cb - callback
   * @returns {String}
   */
  wordOfTheDay : function (cb) {
    var options = { method: 'GET',
      url: 'http://api.wordnik.com:80/v4/words.json/wordOfTheDay',
      qs: { api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5' },
      headers: 
      { 'Postman-Token': '5f0b00b0-0e06-4a7a-90e3-486be2aedee3',
        'Cache-Control': 'no-cache' } };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      cb(null, JSON.parse(body).word);
    });
  }
}
