const fs = require('fs');
const config = require('../config');
const execFile = require('child_process').execFile;

const { proxyHost, proxyPort, configFileName, gameDir, clientExecutable } = config;
const serverAddressRegex = /IP=(.+)/;
const serverPortRegex = /Port=([0-9]+)/;

let serverAddress, serverPort;

function setUp() {
	return new Promise((resolve, reject) => {
		try {
			fs.copyFileSync(gameDir + configFileName, gameDir + configFileName + '.default', fs.constants.COPYFILE_FICLONE);

			fs.readFile(gameDir + configFileName, 'utf8', function(err, data) {
				if (err) {
					return reject(err);
				}

				serverAddress = data.match(serverAddressRegex)[1];
				serverPort = data.match(serverPortRegex)[1];

				let result = data
					.replace(serverAddressRegex, `IP=${proxyHost}`)
					.replace(serverPortRegex, `Port=${proxyPort}`);

				fs.writeFile(gameDir + configFileName, result, 'utf8', function(err) {
					if (err) {
						return reject(err);
					}

					resolve({ serverAddress, serverPort });
				});
			});
		} catch (e) {
			reject(e);
		}
	});
}

function cleanUp() {
	try {
		fs.copyFileSync(gameDir + configFileName + '.default', gameDir + configFileName, fs.constants.COPYFILE_FICLONE);
	} catch (e) {
		console.warn(e);
	}
	try {
		fs.unlinkSync(gameDir + configFileName + '.default');
	} catch (e) {
		console.warn(e);
	}
}

function start() {
	return new Promise((resolve, reject) => {
		execFile(gameDir + clientExecutable, function(err, data) {
			console.log('execFile', data.toString());

			if (err) {
				return reject(err);
			}

			resolve(data.toString());
		});
	});
}

module.exports = {
	setUp,
	cleanUp,
	start,
};
