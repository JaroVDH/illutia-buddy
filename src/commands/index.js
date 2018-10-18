const Move = require('./Move');
const Cast = require('./Cast');
const Face = require('./Face');
const ItemDrop = require('./ItemDrop');
const commandSeparator = String.fromCharCode(0x01);

module.exports = {
	commandSeparator,
	Cast,
	Move,
	Face,
	ItemDrop,
};