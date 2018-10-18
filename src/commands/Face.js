class Face {
	static identifier = /^F([0-4])$/;

	constructor(direction) {
		this.direction = direction;
	}

	static fromCommandString(commandString) {
		const match = commandString.match(this.identifier);

		return new this(match[1]);
	}

	toCommandString() {
		return `F${this.direction}`;
	}
}

module.exports = Face;