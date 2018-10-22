const { notifyOnItemDrop, notifySettings } = require('../../config');
const { ItemDrop, Message } = require('../commands');
const notifier = require('node-notifier');

class NotifyOnItemDrop {
	static onCommand(/** ItemDrop */ command, /** Session */ session) {
		for (let item in notifyOnItemDrop) {
			if (notifyOnItemDrop.hasOwnProperty(item) && command.name.indexOf(item) !== -1 && command.quantity >= notifyOnItemDrop[item]) {
				const text = `${command.quantity} x ${command.name} dropped nearby! (${command.xPos},${command.yPos})`;

				if (notifySettings.itemDrop.message) {
					const message = new Message(Message.types.blue, `[ITEM] ${text}`);

					session.writeToLocal(message.toCommandString());
				}
				if (notifySettings.itemDrop.notification) {
					notifier.notify({
						title: '[ITEM]',
						message: text,
					})
				}

				return;
			}
		}
	}
}

NotifyOnItemDrop.triggers = [ItemDrop];

module.exports = NotifyOnItemDrop;
