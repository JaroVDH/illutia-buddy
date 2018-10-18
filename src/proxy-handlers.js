const { commandSeparator, ...commandDefinitions } = require('./commands');
const processCommand = require('./command-processor');

function toCommandStrings(cb) {
	let dataBuffer = "";

	return (data, remoteSocket, localSocket) => {
		const chunks = (dataBuffer + data).split(commandSeparator);

		dataBuffer = chunks.pop();

		for (let idx in chunks) {
			cb(chunks[idx], remoteSocket, localSocket);
		}
	}
}

function commandHandler(commandString, remoteSocket, localSocket) {
	for (let commandName in commandDefinitions) {
		if (commandDefinitions[commandName].identifier.test(commandString)) {
			const command = commandDefinitions[commandName].fromCommandString(commandString);

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