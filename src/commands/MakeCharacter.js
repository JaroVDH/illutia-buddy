class MakeCharacter {
	constructor(entity, type, name, title, suffix, a, xPos, yPos, ...rest) {
		this.entity = parseInt(entity);
		this.type = parseInt(type);
		this.name = name;
		this.title = title;
		this.surname = suffix;
		this.a = a;
		this.xPos = parseInt(xPos);
		this.yPos = parseInt(yPos);
		this.rest = rest;

		if (Object.values(MakeCharacter.types).indexOf(this.type) === -1) {
			console.log('Unknown type for Make Character', this);
		}
	}

	static fromCommandString(commandString) {
		const chunks = commandString.substr(3).split(',');

		return new this(...chunks);
	}

	toCommandString() {
		return `MKC${this.entity},${this.type},${this.name},${this.title},${this.surname},${this.a},${this.xPos},${this.yPos},${this.rest.join(',')}`;
	}
}

MakeCharacter.identifier = /^MKC([0-9]+)/;
MakeCharacter.types = {
	player: 1,
	mob: 2,
	vendor: 10,
	questGiver: 12,
};

module.exports = MakeCharacter;
