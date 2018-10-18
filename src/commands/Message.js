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
Message.types = {
	black: 1,
	yellow: 2,
	purple: 3,
	blue: 6,
	green: 7,
};

module.exports = Message;