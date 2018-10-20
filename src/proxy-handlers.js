const { commandSeparator, ...commands } = require('./commands');
const actions = require('./actions');

function toCommandStrings(cb) {
	let dataBuffer = "";

	return (data, proxy) => {
		const commandStrings = (dataBuffer + data).split(commandSeparator);

		dataBuffer = commandStrings.pop();

		for (let idx in commandStrings) {
			cb(commandStrings[idx], proxy);
		}
	}
}

function commandHandler(commandString, proxy) {
	for (let commandName in commands) {
		if (commands[commandName].identifier.test(commandString)) {
			const command = commands[commandName].fromCommandString(commandString);

			for (let idx in actions) {
				if (actions[idx].triggers.indexOf(command.constructor) !== -1) {
					actions[idx].onCommand(command, proxy);
				}
			}
		}
	}
}

module.exports = {
	processToRemoteData: toCommandStrings(commandHandler),
	processToLocalData: toCommandStrings(commandHandler),
	onConnect: (e) => console.log('onConnect', e),
	onLocalClose: (e) => console.log('onLocalClose', e),
	onRemoteClose: (e) => console.log('onRemoteClose', e),
};
