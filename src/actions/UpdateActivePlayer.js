const Player = require('../models/Player');
const { MakeCharacter } = require('../commands');

class UpdateActivePlayer {
	static onCommand(/** MakeCharacter */ command, /** Session */ session) {
		switch (command.constructor) {
			case MakeCharacter: {
				if (command.type !== MakeCharacter.types.player) {
					return;
				}

				if (session.activePlayer && session.activePlayer.entity === command.entity) {
					session.activePlayer.update(command);
				}
				break;
			}
			case 'PlayerRenderClassGoesHere': {
				if (session.activePlayer) {
					session.activePlayer.update(command);
				} else {
					session.activePlayer = new Player(command.name, command.entity);
				}
			}
		}
	}
}

UpdateActivePlayer.triggers = [MakeCharacter];

module.exports = UpdateActivePlayer;
