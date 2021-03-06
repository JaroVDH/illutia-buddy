class Cast {
	constructor(spellId) {
		this.spellId = parseInt(spellId);
	}

	static fromCommandString(commandString) {
		const match = commandString.match(this.identifier);

		return new this(match[1]);
	}

	toCommandString() {
		return `CAST${this.spellId}`;
	}
}
Cast.identifier = /^CAST([0-9]+)$/;

module.exports = Cast;