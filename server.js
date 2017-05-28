var connect = require('connect');
var serveStatic = require('serve-static');
var app = connect();

var config = require('./config.js');
var pkg = require('./package.json');

// HTTP server to serve static files
app.use('/bower_components', serveStatic('./bower_components'));

app.use('/version', function (req, res) {
	res.setHeader('content-type', 'application/json');
	res.end(JSON.stringify({
		version: pkg.version,
		node: process.versions.node
	}));
});

app.use(serveStatic('./www')).listen(config.port, function() {
    console.log(pkg.name + ' ' + pkg.version + ' (node ' + process.versions.node + ')');
    console.log('HTTP server running on ' + config.port + '...');
});
