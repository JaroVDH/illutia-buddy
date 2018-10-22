class FakeCommand {
	constructor(target, commandString) {
		this.target = this.types[target] || this.types.client;
		this.commandString = commandString;
	}

	static fromCommandString(commandString) {
		const match = commandString.match(this.identifier);

		return new this(...match.slice(1));
	}
}

FakeCommand.identifier = /^\/fake ([a-z]+) (.*)$/;
FakeCommand.types = {
	client: 1,
	server: 2,
};

module.exports = FakeCommand;
