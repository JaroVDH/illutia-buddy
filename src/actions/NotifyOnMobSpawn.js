const { MakeCharacter, Message } = require('../commands');
const { notifyOnMobSpawn } = require('../../config');

class NotifyOnMobSpawn {
	static onCommand(command, session) {
		if (Object.values(MakeCharacter.types).indexOf(command.type) === -1) {
			console.log('Unknown type for Make Character', command);
		}

		for (let i = 0; i < notifyOnMobSpawn.length; i++) {
			if (command.name.indexOf(notifyOnMobSpawn[i]) !== -1) {
				const message = new Message(Message.types.blue, `[MOB] ${command.name} spawned nearby! (${command.xPos},${command.yPos})`);

				session.writeToLocal(message.toCommandString());
			}
		}
	}
}

NotifyOnMobSpawn.triggers = [MakeCharacter];

module.exports = NotifyOnMobSpawn;
