const Player = require('../models/Player');
const { MakeCharacter } = require('../commands');

class UpdateActivePlayer {
	static onCommand(command, session) {
		if (command.type !== MakeCharacter.types.player) {
			return;
		}

		if (session.activePlayer) {
			session.activePlayer.update(command);
		} else {
			session.activePlayer = new Player(command.name, command.entity);
		}
	}
}

UpdateActivePlayer.triggers = [MakeCharacter];

module.exports = UpdateActivePlayer;
