const proxyHandlers = require('../src/proxy-handlers');
const Player = require('../src/models/Player');

const mockSession = {
	activePlayer: new Player('SomePlayer', 1),
	writeToLocal: (...args) => {
		console.log('writeToLocal', args);
	},
	writetoRemote: (...args) => {
		console.log('writetoRemote', args);
	}
};

const dropItemCmd = 'DOB331979,2275,0,0,100,101,,Powerful poop,,1,0,0,0,*' + String.fromCharCode(0x01);

proxyHandlers.processToLocalData(dropItemCmd, mockSession);

const questCredit = 'BT61,1,Quest Credit: Yhep' + String.fromCharCode(0x01);

proxyHandlers.processToLocalData(questCredit, mockSession);
console.log(mockSession.activePlayer.meta);
proxyHandlers.processToLocalData(questCredit, mockSession);
console.log(mockSession.activePlayer.meta);

