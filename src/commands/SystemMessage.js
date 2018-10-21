class SystemMessage {
	constructor(type, text) {
		this.type = parseInt(type);
		this.text = text;
	}

	static fromCommandString(commandString) {
		const match = commandString.match(this.identifier);

		return new this(...match.slice(1));
	}

	toCommandString() {
		return `^${this.type},${this.text}`;
	}
}

SystemMessage.identifier = /^\^([0-9]+),(.*)/;

module.exports = SystemMessage;