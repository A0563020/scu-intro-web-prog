//source: https://github.com/IDMNYU/DM-GY-6063B-Creative-Coding/blob/master/node-examples/markov.js

var fs = require('fs');
var rita = require('rita');

var text_1 = fs.readFileSync("biglebowski.txt", 'utf8');
var text_2 = fs.readFileSync("alice-wonderland.txt", 'utf8');

var markov = rita.RiMarkov(3);
markov.loadText(text_1);
markov.loadText(text_2);

for (var i = 0; i < 20; i++) {
    console.log(markov.generateSentences(1)[0]);
}