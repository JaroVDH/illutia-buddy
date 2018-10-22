const Player = require('../models/Player');
const { MakeCharacter } = require('../commands');

class UpdateActivePlayer {
	static onCommand(/** MakeCharacter */ command, /** Session */ session) {
		if (!session.activePlayer) {
			session.activePlayer = new Player(command.name, command.entity);
			//Only need to set it once
			this.triggers = [];
		}
	}
}

UpdateActivePlayer.triggers = [MakeCharacter];

module.exports = UpdateActivePlayer;
