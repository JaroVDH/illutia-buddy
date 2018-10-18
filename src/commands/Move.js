class Move {
	static identifier = /^M([0-4])$/;

	constructor(direction) {
		this.direction = direction;
	}

	static fromCommandString(commandString) {
		const match = commandString.match(this.identifier);

		return new this(match[1]);
	}

	toCommandString() {
		return `M${this.direction}`;
	}
}

module.exports = Move;