var fs = require('fs');
var http = require('http');
var rita = require('rita');

var text = fs.readFileSync("alice-wonderland.txt", 'utf8');

var markov = rita.RiMarkov(3);
markov.loadText(text);

var data = function() {
	return markov.generateSentences(1)[0];
}

fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }

    setInterval(fetchMarkov, 5000);

	var server = http.createServer(function(request, response) {
		
	    response.writeHead(200, {"Content-Type": "text/html"});
	    response.write(data());
	    response.end();
		});

server.listen(8888);
});

var fetchMarkov = function(){
	console.log(data());
}

console.log("web server now available at http://127.0.0.1:8888");
console.log("ctrl+C to quit");