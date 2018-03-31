var request = require("request");

module.exports = {
  authenticate : function () {


    var options = { method: 'GET',
      url: 'http://api.wordnik.com:80/v4/account.json/authenticate/sujayvenaik@gmail.com',
      qs: 
      { password: 'Sujay2396#',
        api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5' },
      headers: 
      { 
        password: 'Sujay2396#',
        username: 'sujayvenaik@gmail.com' } };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });
  },

  wordDefinition : function  (word) {
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

      console.log(`The def for word: ${word}\n${JSON.parse(body)[0].text}`);
    });

  }
}
