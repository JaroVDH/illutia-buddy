class Move {
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
Move.identifier = /^M([0-4])$/;

module.exports = Move;