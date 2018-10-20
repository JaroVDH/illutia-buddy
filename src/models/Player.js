const fs = require('fs');

class Player {
	constructor(name, entity) {
		this.name = name;
		this.entity = entity;
		this.loadMeta();
	}

	update(command) {
		this.name = command.name;
		this.entity = command.entity;
	}

	loadMeta() {
		const fileSafeName = this.name.replace(/[^a-z0-9]/gi, '_').toLowerCase(),
			fileLoc = `../../data/${fileSafeName}.json`;

		this.meta = {};

		try {
			if (fs.existsSync(fileLoc)) {
				const playerData = JSON.parse(fs.readFileSync(fileLoc, 'utf8'));

				Object.assign(this.meta, playerData);
			}
		} catch (e) {
			console.warn(e);
		}
	}

	saveMeta() {
		const fileSafeName = this.name.replace(/[^a-z0-9]/gi, '_').toLowerCase(),
			fileLoc = `../../data/${fileSafeName}.json`,
			playerData = JSON.stringify(this.meta);

		try {
			fs.writeFileSync(fileLoc, playerData, 'utf8');
		} catch (e) {
			console.warn(e);
		}
	}
}

module.exports = Player;
