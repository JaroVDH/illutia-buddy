const { commandSeparator } = require('../commands');

class Session {
	constructor(localSocket, remoteSocket) {
		this.localSocket = localSocket;
		this.remoteSocket = remoteSocket;
	}

	writeToLocal(data) {
		const flushed = this.localSocket.write(data + commandSeparator);

		if (!flushed) {
			this.remoteSocket.pause();
		}
	}

	writeToRemote(data) {
		const flushed = this.remoteSocket.write(data + commandSeparator);

		if (!flushed) {
			this.localSocket.pause();
		}
	}
}

module.exports = Session;
