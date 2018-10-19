const { commandSeparator, ItemDrop, Message } = require('./commands');
const config = require('../config');

const { notifyOnItem } = config;

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
			for (let item in notifyOnItem) {
				if (notifyOnItem.hasOwnProperty(item) && command.name.indexOf(item) !== -1 && command.quantity >= notifyOnItem[item]) {
					const message = new Message(Message.types.blue, `${command.quantity} x ${command.name} dropped nearby!`);

					writeToLocal(message.toCommandString());
				}
			}
			break;
		}
	}
}

module.exports = processCommand;
