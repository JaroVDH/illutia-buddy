const Cast = require('./Cast');
const Face = require('./Face');
const FakeCommand = require('./FakeCommand');
const Move = require('./Move');
const Talk = require('./Talk');

const commandSeparator = String.fromCharCode(0x01);

module.exports = {
	Cast,
	Face,
	FakeCommand,
	Move,
	Talk,
	commandSeparator,
};
