const Move = require('./Move');
const Cast = require('./Cast');
const Face = require('./Face');
const MakeItemDrop = require('./MakeItemDrop');
const commandSeparator = String.fromCharCode(0x01);

module.exports = {
	commandSeparator,
	Cast,
	Move,
	Face,
	MakeItemDrop,
};