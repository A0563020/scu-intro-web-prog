//source: https://github.com/IDMNYU/DM-GY-6063B-Creative-Coding/blob/master/node-examples/markov.js

var fs = require('fs');
var rita = require('rita');

var text = fs.readFileSync("biglebowski.txt", 'utf8');

var markov = rita.RiMarkov(3);
markov.loadText(text);

for (var i = 0; i < 10; i++) {
    console.log(markov.generateSentences(1)[0]);
}