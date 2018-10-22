const client = require('./client');
const server = require('./server');

const commandSeparator = String.fromCharCode(0x01);

module.exports = {
	client,
	server,
	commandSeparator,
};
