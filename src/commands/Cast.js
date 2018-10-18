class Cast {
	static identifier = /^CAST([0-9]+)$/;

	constructor(spellId) {
		this.spellId = spellId;
	}

	static fromCommandString(commandString) {
		const match = commandString.match(this.identifier);

		return new this(match[1]);
	}

	toCommandString() {
		return `CAST${this.spellId}`;
	}
}

module.exports = Cast;