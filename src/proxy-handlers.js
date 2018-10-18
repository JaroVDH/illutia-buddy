const { ...commandDefinitions, commandSeparator } = require('./commands');
const processCommand = require('./command-processor');

function toCommandStrings(processCommand) {
	let dataBuffer = "";

	return (data, remoteSocket, localSocket) => {
		const chunks = (dataBuffer + data).split(commandSeparator);

		dataBuffer = chunks.pop();

		for (let idx in chunks) {
			processCommand(chunks[idx], remoteSocket, localSocket);
		}
	}
}

function commandHandler(commandString, remoteSocket, localSocket) {
	for (let commandName in commandDefinitions) {
		if (commandDefinitions[commandName].indentifier.test(commandString)) {
			let command = commandDefinitions[commandName].fromCommandString(commandString);

			console.log('Created ‘%s’ command', commandName, command);

			processCommand(command, remoteSocket, localSocket);
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