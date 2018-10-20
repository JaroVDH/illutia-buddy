const { commandSeparator, ...commands } = require('./commands');
const actions = require('./actions');

function toCommandStrings(cb) {
	let dataBuffer = "";

	return (data, session) => {
		const commandStrings = (dataBuffer + data).split(commandSeparator);

		dataBuffer = commandStrings.pop();

		for (let idx in commandStrings) {
			cb(commandStrings[idx], session);
		}
	}
}

function commandHandler(commandString, session) {
	for (let commandName in commands) {
		if (commands[commandName].identifier.test(commandString)) {
			const command = commands[commandName].fromCommandString(commandString);

			for (let idx in actions) {
				if (actions[idx].triggers.indexOf(command.constructor) !== -1) {
					actions[idx].onCommand(command, session);
				}
			}
		}
	}
}

function cleanupSession(hasError, session) {
	if (hasError) {
		console.warn(hasError);
	}

	if (session.activePlayer) {
		session.activePlayer.saveMeta();
	}
}

module.exports = {
	processToRemoteData: toCommandStrings(commandHandler),
	processToLocalData: toCommandStrings(commandHandler),
	onLocalClose: cleanupSession,
	onRemoteClose: cleanupSession,
	onConnect: (e) => console.log('onConnect', e),
};
