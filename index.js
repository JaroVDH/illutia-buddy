const TCPProxy = require('./src/TCPProxy');
const proxyHandlers = require('./src/proxy-handlers');
const config = require('./config');
const { setUp: setUpClient, cleanUp: cleanUpClient, start: startClient } = require('./src/client');

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
	const proxy = new TCPProxy({
		remoteAddress: serverAddress,
		remotePort: serverPort,
		...proxyHandlers
	});

	if (proxy.server) {
		proxy.server.listen(proxyPort);
		console.log('Listening on %d, sending to %s:%d', proxyPort, serverAddress, serverPort);
		startClient().catch(onExit);
	} else {
		console.warn('Something went wrong setting up the server!');
	}
}).catch(onExit);

