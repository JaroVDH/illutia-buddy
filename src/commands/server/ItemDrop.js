class ItemDrop {
	constructor(a, b, c, d, xPos, yPos, g, name, i, quantity, k, l, m, n) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.xPos = parseInt(xPos);
		this.yPos = parseInt(yPos);
		this.g = g;
		this.name = name;
		this.i = i;
		this.quantity = parseInt(quantity);
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
			this.d,
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