class Message {
	constructor(type, text) {
		this.type = type;
		this.text = text;
	}

	static fromCommandString(commandString) {
		return new this(commandString.substr(0, 1), commandString.substr(2));
	}

	toCommandString() {
		return `$${this.type}${this.text}`;
	}
}

Message.identifier = /^\$[0-9].*/;

module.exports = Message;