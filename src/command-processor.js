const { commandSeparator, ItemDrop, Message } = require('./commands');
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
		case ItemDrop: {
			if ('undefined' !== typeof notifyOnItem[command.name] && command.quantity >= notifyOnItem[command.name]) {
				const message = new Message(Message.types.blue, `${command.name} nearby!`);

				writeToLocal(message.toCommandString());
			}
			break;
		}
	}
}

module.exports = processCommand;