module.exports = {
	gameDir: '../',
	configFileName: 'Illutia.ini',
	clientExecutable: 'IllutiaGame.exe',
	notifyOnItemDrop: {
		'Powerful': 1,
		'Valiant': 1,
		'Gold': 1000,
	},
	notifyOnMobSpawn: [
		'Punchy',
		'Kitsune Spirit',
		'Sala',
	],
	notifySettings: {
		itemDrop: {
			message: true,
			notification: false,
		},
		mobSpawn: {
			message: false,
			notification: true,
		}
	},
	proxyPort: 8080,
	proxyHost: '127.0.0.1',
};