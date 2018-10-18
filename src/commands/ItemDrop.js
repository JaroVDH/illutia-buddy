class ItemDrop {
	constructor(a, b, c, xPos, yPos, g, name, i, quantity, k, l, m, n) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.xPos = xPos;
		this.yPos = yPos;
		this.g = g;
		this.name = name;
		this.i = i;
		this.quantity = quantity;
		this.k = k;
		this.l = l;
		this.m = m;
		this.n = n;
	}

	static fromCommandString(commandString) {
		const chunks = commandString.substr(3).split(',');

		return new this(...chunks);
	}

	toCommandString() {
		return 'DOB' + [
			this.a,
			this.b,
			this.c,
			this.xPos,
			this.yPos,
			this.g,
			this.name,
			this.i,
			this.quantity,
			this.k,
			this.l,
			this.m,
			this.n,
		].join(',');
	}
}

ItemDrop.identifier = /^DOB[0-9]+/;

module.exports = ItemDrop;