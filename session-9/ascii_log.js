
// taken from http://aem1k.com/fire/

setInterval(p = function (_p) {
	function p(_x) {
		return _p.apply(this, arguments);
	}

	p.toString = function () {
		return _p.toString();
	};

	return p;
}(function (h) {
	for (p[I++ * I % 20 + 576] = i = 89; i++ < 630; h += i % 30 ? "`io"[p[i] = p[i] + p[i + 1] + p[i + 29] + p[i + 30] >> 2] || Math.floor(Math.random()*1.9) : "\n") {}console.log(h);
}), I = 20);