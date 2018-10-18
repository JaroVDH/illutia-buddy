const { commandSeparator, ItemDrop, Message } = require('./commands');
const { notifyOnItem } = require('../config');

function processCommand(command, remoteSocket, localSocket) {
	function writeToLocal(data) {
		console.log('Writing data to local', data + commandSeparator);
		const flushed = localSocket.write(data + commandSeparator);

		if (!flushed) {
			remoteSocket.pause();
		}
	}

	function writeToRemote(data) {
		console.log('Writing data to remote', data + commandSeparator);
		const flushed = remoteSocket.write(data + commandSeparator);

		if (!flushed) {
			localSocket.pause();
		}
	}

	switch (command.constructor) {
		case ItemDrop: {
			console.log('Found item drop', command);
			for (let idx in notifyOnItem) {
				if (command.name.indexOf(notifyOnItem[idx]) !== -1) {
					const message = new Message(Math.floor(Math.random() * 10), `‘${command.name}‘ dropped!`);

					writeToLocal(message.toCommandString());
				}
			}
			break;
		}
	}
}

module.exports = processCommand;