const net = require('net');
const Session = require('./models/Session');

class TCPProxy {
	constructor(options) {
		if ('undefined' === typeof options.remoteAddress
			|| 'undefined' === typeof options.remotePort) {
			throw new Error("Missing remoteAddress or remotePort");
		}

		this.remoteAddress = options.remoteAddress;
		this.remotePort = options.remotePort;
		this.processToRemoteData = options.processToRemoteData;
		this.processToLocalData = options.processToLocalData;
		this.onConnect = options.onConnect;
		this.onLocalClose = options.onLocalClose;
		this.onRemoteClose = options.onRemoteClose;

		this.server = net.createServer((localSocket) => {
			const remoteSocket = new net.Socket();
			remoteSocket.connect(this.remotePort, this.remoteAddress);
			const session = new Session(localSocket, remoteSocket);

			localSocket.on('connect', (data) => {
				if ('function' === typeof this.onConnect) {
					this.onConnect(data, session);
				}
			});

			localSocket.on('data', (data) => {
				if ('function' === typeof this.processToRemoteData) {
					this.processToRemoteData(data, session);
				}

				const flushed = remoteSocket.write(data);

				if (!flushed) {
					localSocket.pause();
				}
			});

			remoteSocket.on('data', (data) => {
				if ('function' === typeof this.processToLocalData) {
					this.processToLocalData(data, session);
				}

				const flushed = localSocket.write(data);

				if (!flushed) {
					remoteSocket.pause();
				}
			});

			localSocket.on('drain', () => {
				remoteSocket.resume();
			});

			remoteSocket.on('drain', () => {
				localSocket.resume();
			});

			localSocket.on('close', (had_error) => {
				if ('function' === typeof this.onLocalClose) {
					this.onLocalClose(had_error, session);
				}

				remoteSocket.end();
			});

			remoteSocket.on('close', (had_error) => {
				if ('function' === typeof this.onRemoteClose) {
					this.onRemoteClose(had_error, session);
				}

				localSocket.end();
			});
		});
	}
}

module.exports = TCPProxy;
