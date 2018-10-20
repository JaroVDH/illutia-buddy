class MakePlayer {
	constructor(entity, a, name, title, suffix, ...rest) {
		this.entity = entity;
		this.a = a;
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
		return `MKC${this.entity},${this.a},${this.name},${this.title},${this.suffix},${this.rest.join(',')}`;
	}
}

MakePlayer.identifier = /^MKC([0-9]+),([0-9]+),([^,]*),([^,]*),([^,]*),(.*)$/;

module.exports = MakePlayer;
