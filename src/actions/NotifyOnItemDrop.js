const { notifyOnItem } = require('../../config');
const { ItemDrop, Message } = require('../commands');

class NotifyOnItemDrop {
	static onCommand(command, session) {
		for (let item in notifyOnItem) {
			if (notifyOnItem.hasOwnProperty(item) && command.name.indexOf(item) !== -1 && command.quantity >= notifyOnItem[item]) {
				const message = new Message(Message.types.blue, `[ITEM] ${command.quantity} x ${command.name} dropped nearby! (${command.xPos},${command.yPos})`);

				session.writeToLocal(message.toCommandString());
			}
		}
	}
}

NotifyOnItemDrop.triggers = [ItemDrop];

module.exports = NotifyOnItemDrop;