class MakeCharacter {
	constructor(entity, type, name, title, suffix, a, xPos, yPos, ...rest) {
		this.entity = entity;
		this.type = type;
		this.name = name;
		this.title = title;
		this.surname = suffix;
		this.a = a;
		this.xPos = xPos;
		this.yPos = yPos;
		this.rest = rest;
	}

	static fromCommandString(commandString) {
		const match = commandString.match(this.identifier);

		return new this(...match.slice(1));
	}

	toCommandString() {
		return `MKC${this.entity},${this.type},${this.name},${this.title},${this.surname},${this.a},${this.xPos},${this.yPos},${this.rest.join(',')}`;
	}
}

MakeCharacter.identifier = /^MKC([0-9]+),([0-9]+),([^,]*),([^,]*),([^,]*),([^,]*),([0-9]+),([0-9]+),(.*)$/;
MakeCharacter.types = {
	player: 1,
	other: 2,
};

module.exports = MakeCharacter;
