const { commandSeparator, MakeItemDrop, Message } = require('./commands');
const { notifyOnItem } = require('../config');

function processCommand(command, remoteSocket, localSocket) {
	function writeToLocal(data) {
		const flushed = localSocket.write(data + commandSeparator);

		if (!flushed) {
			remoteSocket.pause();
		}
	}

	function writeToRemote(data) {
		const flushed = remoteSocket.write(data + commandSeparator);

		if (!flushed) {
			localSocket.pause();
		}
	}

	switch (command.constructor) {
		case MakeItemDrop: {
			for (let idx in notifyOnItem) {
				if (command.name.indexOf(notifyOnItem[idx]) !== -1) {
					const message = new Message(`‘${command.name}‘ dropped!`);

					writeToLocal(message.toCommandString());
				}
			}
			break;
		}
	}
}

module.exports = processCommand;