class MakeItemDrop {
	static identifier = /^MIK([0-4]+),([^,]+)$/;

	constructor(item, name) {
		this.item = item;
		this.name = name;
	}

	static fromCommandString(commandString) {
		const match = commandString.match(this.identifier);

		return new this(match[1], match[2]);
	}

	toCommandString() {
		return `MIK${this.item},${this.name}`;
	}
}

module.exports = MakeItemDrop;