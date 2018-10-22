class Message {
	constructor(type, text) {
		this.type = parseInt(type);
		this.text = text;
	}

	static fromCommandString(commandString) {
		return new this(commandString.substr(1, 1), commandString.substr(2));
	}

	toCommandString() {
		return `$${this.type}${this.text}`;
	}
}

Message.identifier = /^\$[0-9].*/;
Message.types = {
	black: 1,
	chat: 1,
	yellow: 2,
	guild: 2,
	purple: 3,
	tell: 3,
	blue: 6,
	group: 6,
	server: 7,
};

module.exports = Message;