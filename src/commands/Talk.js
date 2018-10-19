class Talk {
	constructor(text) {
		this.text = text;
	}

	static fromCommandString(commandString) {
		return new this(commandString.substr(1));
	}

	toCommandString() {
		return `;${this.text}`;
	}
}

Talk.identifier = /^;.*/;

module.exports = Talk;