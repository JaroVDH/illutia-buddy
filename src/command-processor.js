import commands, { commandSeparator } from './commands';
import config from '../config';

const notifyOnItem = config.notifyOnItem;

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
		case commands.ItemDrop: {
			if ('undefined' !== typeof notifyOnItem[command.name] && command.quantity >= notifyOnItem[command.name]) {
				const message = new commands.Message(commands.Message.types.blue, `${command.name} nearby!`);

				writeToLocal(message.toCommandString());
			}
			break;
		}
	}
}

export default processCommand;