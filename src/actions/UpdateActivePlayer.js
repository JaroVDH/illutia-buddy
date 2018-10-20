const Player = require('../models/Player');
const { MakePlayer } = require('../commands');

class UpdateActivePlayer {
	static onCommand(command, session) {
		if (session.activePlayer) {
			session.activePlayer.update(command);
		} else {
			session.activePlayer = new Player(command.name, command.entity);
		}
	}
}

UpdateActivePlayer.triggers = [MakePlayer];

module.exports = UpdateActivePlayer;
