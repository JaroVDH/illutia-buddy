import fs from 'fs';
import config from '../config';

const { proxyHost, proxyPort, configFileName, gameDir } = config;
const serverHostRegex = /IP=([^\n\r]+)/;
const serverPortRegex = /Port=([0-9]+)/;

let serverHost, serverPort;

export function setUp() {
	return new Promise((resolve, fail) => {
		fs.copyFileSync(gameDir + configFileName, gameDir + configFileName + '.default', fs.constants.COPYFILE_FICLONE);

		fs.readFile(gameDir + configFileName, 'utf8', function(err, data) {
			if (err) {
				return fail(err);
			}

			serverHost = data.match(serverHostRegex)[1];
			serverPort = data.match(serverPortRegex)[1];

			let result = data
				.replace(serverHostRegex, proxyHost)
				.replace(serverPortRegex, proxyPort);

			fs.writeFile(gameDir + configFileName, result, 'utf8', function(err) {
				if (err) {
					return fail(err);
				}

				resolve({ serverHost, serverPort });
			});
		});
	});
}

export function cleanUp() {
	fs.copyFileSync(gameDir + configFileName + '.default', gameDir + configFileName, fs.constants.COPYFILE_FICLONE);
}