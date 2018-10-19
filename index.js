import TCPProxy from './src/tcp-proxy';
import proxyHandlers from './src/proxy-handlers';
import config from './config';
import { setUp, cleanUp } from './src/client-config';

const { proxyPort } = config;

process.on('uncaughtException', function(error) {
	console.error(error);
});

process.on('error', function(error) {
	console.error(error);
});

setUp().then(({ serverAddress, serverPort }) => {
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

