const { FakeCommand } = require('../commands');

class UseFakeCommand {
	static onCommand(/** FakeCommand */ command, /** Session */ session) {
		if (command.target === FakeCommand.types.client) {
			session.writeToLocal(command.commandString);
		} else {
			session.writeToRemote(command.commandString);
		}
	}
}

UseFakeCommand.triggers = [FakeCommand];

module.exports = UseFakeCommand;
