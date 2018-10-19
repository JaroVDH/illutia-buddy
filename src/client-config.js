const fs = require('fs');
const config = require('../config');

const { proxyHost, proxyPort, configFileName, gameDir } = config;
const serverAddressRegex = /IP=(.+)/;
const serverPortRegex = /Port=([0-9]+)/;

let serverAddress, serverPort;

function setUp() {
	return new Promise((resolve, fail) => {
		fs.copyFileSync(gameDir + configFileName, gameDir + configFileName + '.default', fs.constants.COPYFILE_FICLONE);

		fs.readFile(gameDir + configFileName, 'utf8', function(err, data) {
			if (err) {
				return fail(err);
			}

			serverAddress = data.match(serverAddressRegex)[1];
			serverPort = data.match(serverPortRegex)[1];

			let result = data
				.replace(serverAddressRegex, `IP=${proxyHost}`)
				.replace(serverPortRegex, `Port=${proxyPort}`);

			fs.writeFile(gameDir + configFileName, result, 'utf8', function(err) {
				if (err) {
					return fail(err);
				}

				resolve({ serverAddress, serverPort });
			});
		});
	});
}

function cleanUp() {
	fs.copyFileSync(gameDir + configFileName + '.default', gameDir + configFileName, fs.constants.COPYFILE_FICLONE);
	fs.unlinkSync(gameDir + configFileName + '.default');
}

module.exports = {
	setUp,
	cleanUp,
};
