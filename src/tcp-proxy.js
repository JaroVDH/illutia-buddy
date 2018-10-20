const { commandSeparator } = require('./commands');
const net = require('net');

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

		this.server = net.createServer((ls) => {
			this.localSocket = ls;
			this.remoteSocket = new net.Socket();
			this.remoteSocket.connect(this.remotePort, this.remoteAddress);

			this.localSocket.on('connect', (data) => {
				if ('function' === typeof this.onConnect) {
					this.onConnect(data);
				}
			});

			this.localSocket.on('data', (data) => {
				if ('function' === typeof this.processToRemoteData) {
					this.processToRemoteData(data, this);
				}

				this._writeToRemoteRaw(data)
			});

			this.remoteSocket.on('data', (data) => {
				if ('function' === typeof this.processToLocalData) {
					this.processToLocalData(data, this);
				}

				this._writeToLocalRaw(data)
			});

			this.localSocket.on('drain', () => {
				this.remoteSocket.resume();
			});

			this.remoteSocket.on('drain', () => {
				this.localSocket.resume();
			});

			this.localSocket.on('close', (had_error) => {
				if ('function' === typeof this.onLocalClose) {
					this.onLocalClose(had_error, this);
				}

				this.remoteSocket.end();
			});

			this.remoteSocket.on('close', (had_error) => {
				if ('function' === typeof this.onRemoteClose) {
					this.onRemoteClose(had_error, this);
				}

				this.localSocket.end();
			});
		});
	}

	_writeToLocalRaw(data) {
		const flushed = this.localSocket.write(data);

		if (!flushed) {
			this.remoteSocket.pause();
		}
	}

	_writeToRemoteRaw(data) {
		const flushed = this.remoteSocket.write(data);

		if (!flushed) {
			this.localSocket.pause();
		}
	}

	writeToLocal(data) {
		this._writeToLocalRaw(data + commandSeparator)
	}

	writeToRemote(data) {
		this._writeToRemoteRaw(data + commandSeparator)
	}
}

module.exports = TCPProxy;
