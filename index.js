const TCPProxy = require('./src/tcp-proxy');
const proxyHandlers = require('./src/proxy-handlers');
const config = require('./config');
const { setUp: setUpClient, cleanUp: cleanUpClient } = require('./src/client-config');

const { proxyPort } = config;

function onExit(error) {
	if (error) {
		console.error(error);
	}
	cleanUpClient();
	process.exit(error ? 1 : 0);
}

process.stdin.resume();
process.on('uncaughtException', onExit);
process.on('error', onExit);
process.on('SIGINT', onExit);

setUpClient().then(({ serverAddress, serverPort }) => {
	const server = TCPProxy({
		remoteAddress: serverAddress,
		remotePort: serverPort,
		...proxyHandlers
	});

	if (server) {
		server.listen(proxyPort);
		console.log('Listening on %d, sending to %s:%d', proxyPort, serverAddress, serverPort);
	} else {
		console.warn('Something went wrong setting up the server!');
	}
});

