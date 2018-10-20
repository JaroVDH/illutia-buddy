const proxyHandlers = require('../src/proxy-handlers');

const mockProxy = {
	writeToLocal: (...args) => {
		console.log('writeToLocal', args);
	},
	writetoRemote: (...args) => {
		console.log('writetoRemote', args);
	}
};

const dropItemCmd = 'DOB331979,2275,0,0,100,101,,Powerful poop,,1,0,0,0,*' + String.fromCharCode(0x01);

proxyHandlers.processToLocalData(dropItemCmd, mockProxy);

const questCredit = 'BT61,1,Quest Credit: Yhep' + String.fromCharCode(0x01);

proxyHandlers.processToLocalData(questCredit, mockProxy);
