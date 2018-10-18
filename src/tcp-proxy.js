const net = require("net");

function TCPProxy(options) {
	if ('undefined' === typeof options.remoteAddress
		|| 'undefined' === typeof options.remotePort) {
		throw new Error("Missing remoteAddress or remotePort or localPort");
	}

	const server = net.createServer(function(localSocket) {
		const remoteSocket = new net.Socket();

		remoteSocket.connect(options.remotePort, options.remoteAddress);

		localSocket.on('connect', function(data) {
			if ('function' === typeof options.onConnect) {
				options.onConnect(data);
			}
		});

		localSocket.on('data', function(data) {
			if ('function' === typeof options.processToRemoteData) {
				options.processToRemoteData(data, remoteSocket, localSocket, server);
			}

			const flushed = remoteSocket.write(data);

			if (!flushed) {
				localSocket.pause();
			}
		});

		remoteSocket.on('data', function(data) {
			if ('function' === typeof options.processToLocalData) {
				options.processToLocalData(data, remoteSocket, localSocket);
			}

			const flushed = localSocket.write(data);

			if (!flushed) {
				remoteSocket.pause();
			}
		});

		localSocket.on('drain', function() {
			remoteSocket.resume();
		});

		remoteSocket.on('drain', function() {
			localSocket.resume();
		});

		localSocket.on('close', function(had_error) {
			if ('function' === typeof options.onLocalClose) {
				options.onLocalClose(had_error, remoteSocket, localSocket);
			}

			remoteSocket.end();
		});

		remoteSocket.on('close', function(had_error) {
			if ('function' === typeof options.onRemoteClose) {
				options.onRemoteClose(had_error, remoteSocket, localSocket);
			}

			localSocket.end();
		});
	});

	return server;
}

module.exports = TCPProxy;
