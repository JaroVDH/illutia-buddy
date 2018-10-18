class ItemDrop {
	constructor(a, b, c, d, e, g, name, i, j, k, l, m, n) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.e = e;
		this.g = g;
		this.name = name;
		this.i = i;
		this.j = j;
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
			this.e,
			this.g,
			this.name,
			this.i,
			this.j,
			this.k,
			this.l,
			this.m,
			this.n,
		].join(',');
	}
}

ItemDrop.identifier = /^DOB[0-9]+$/;

module.exports = ItemDrop;