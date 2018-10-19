class SystemMessage {
	constructor(type, text) {
		this.type = type;
		this.text = text;
	}

	static fromCommandString(commandString) {
		const match = commandString.substr(1).match(/([0-9]+),(.*)/);

		return new this(match[1], match[2]);
	}

	toCommandString() {
		return `^${this.type},${this.text}`;
	}
}

SystemMessage.identifier = /^\^[0-9]+,.*/;

export default SystemMessage;