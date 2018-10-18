class Message {
	constructor(text) {
		this.text = text;
	}

	static fromCommandString(commandString) {
		const match = commandString.match(this.identifier);

		return new this(match[1]);
	}

	toCommandString() {
		return `;${this.text}`;
	}
}
Message.identifier = /^;(.*)$/;

module.exports = Message;