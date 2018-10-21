class MakeCharacter {
	constructor(entity, type, name, title, suffix, ...rest) {
		this.entity = entity;
		this.type = type;
		this.name = name;
		this.title = title;
		this.suffix = suffix;

		this.rest = rest;
	}

	static fromCommandString(commandString) {
		const match = commandString.match(this.identifier);

		return new this(...match.slice(1));
	}

	toCommandString() {
		return `MKC${this.entity},${this.type},${this.name},${this.title},${this.suffix},${this.rest.join(',')}`;
	}
}

MakeCharacter.identifier = /^MKC([0-9]+),([0-9]+),([^,]*),([^,]*),([^,]*),(.*)$/;
MakeCharacter.types = {
	player: 1,
	other: 2,
};

module.exports = MakeCharacter;
