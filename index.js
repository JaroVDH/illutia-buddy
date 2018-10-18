const TCPProxy = require('./src/tcp-proxy');
const proxyHandlers = require('./src/proxy-handlers');
const { serverAddress: remoteAddress, serverPort: remotePort } = require('./config');
const localPort = 8080;

process.on('uncaughtException', function(error) {
	console.error(error);
});

process.on('error', function(error) {
	console.error(error);
});

const server = TCPProxy({ remoteAddress, remotePort, ...proxyHandlers });

if (server) {
	server.listen(localPort);
	console.log('Listening on %d, sending to %s:%d', localPort, remoteAddress, remotePort);
} else {
	console.warn('Something went wrong setting up the server!');
}
