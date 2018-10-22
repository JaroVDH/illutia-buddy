class BattleText {
	constructor(target, type, text, source) {
		this.target = parseInt(target);
		this.type = parseInt(type);
		this.text = text;
		this.source = source;
	}

	static fromCommandString(commandString) {
		const match = commandString.match(this.identifier);

		return new this(match[1], match[2], match[3], match[4]);
	}

	toCommandString() {
		let cmdStr = `BT${this.target},${this.type},${this.text}`;

		if (this.source) {
			cmdStr += `,${this.source}`;
		}

		return cmdStr;
	}
}

BattleText.identifier = /^BT([0-9]+),([0-9]+),([^,]+)(?:,(.*))?$/;

BattleText.types = {
	damage: 1,
	quest: 60,
};

module.exports = BattleText;
