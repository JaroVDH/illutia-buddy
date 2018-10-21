const { notifyOnItemDrop } = require('../../config');
const { ItemDrop, Message } = require('../commands');

class NotifyOnItemDrop {
	static onCommand(command, session) {
		for (let item in notifyOnItemDrop) {
			if (notifyOnItemDrop.hasOwnProperty(item) && command.name.indexOf(item) !== -1 && command.quantity >= notifyOnItemDrop[item]) {
				const message = new Message(Message.types.blue, `[ITEM] ${command.quantity} x ${command.name} dropped nearby! (${command.xPos},${command.yPos})`);

				session.writeToLocal(message.toCommandString());
			}
		}
	}
}

NotifyOnItemDrop.triggers = [ItemDrop];

module.exports = NotifyOnItemDrop;
