const proxyHandlers = require('../src/proxy-handlers');

const mockSocket = {
	write: (...args) => {
		console.log('socket write', args);
	},
	pause: (...args) => {
		console.log('socket pause', args);
	}
};

process.on('uncaughtException', function(error) {
	console.error(error);
});

process.on('error', function(error) {
	console.error(error);
});

const dropItemCmd = 'DOB331979,2275,0,0,100,101,,Powerful poop,,1,0,0,0,*' + String.fromCharCode(0x01);

proxyHandlers.processToLocalData(dropItemCmd, mockSocket, mockSocket);
