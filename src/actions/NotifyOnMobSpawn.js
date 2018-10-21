const { notifyOnMobSpawn, notifySettings } = require('../../config');
const { MakeCharacter, Message } = require('../commands');
const notifier = require('node-notifier');

class NotifyOnMobSpawn {
	static onCommand(command, session) {
		for (let i = 0; i < notifyOnMobSpawn.length; i++) {
			if (command.name.indexOf(notifyOnMobSpawn[i]) !== -1) {
				const text = `${command.name} spawned nearby! (${command.xPos},${command.yPos})`;

				if (notifySettings.mobSpawn.message) {
					const message = new Message(Message.types.blue, `[MOB] ${text}`);

					session.writeToLocal(message.toCommandString());
				}
				if (notifySettings.mobSpawn.notification) {
					notifier.notify({
						title: '[MOB]',
						message: text,
					})
				}

				return;
			}
		}
	}
}

NotifyOnMobSpawn.triggers = [MakeCharacter];

module.exports = NotifyOnMobSpawn;
