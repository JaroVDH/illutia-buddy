const Cast = require('./Cast');
const Face = require('./Face');
const ItemDrop = require('./ItemDrop');
const Message = require('./Message');
const Move = require('./Move');
const SystemMessage = require('./SystemMessage');
const Talk = require('./Talk');
const commandSeparator = String.fromCharCode(0x01);

module.exports = {
	commandSeparator,
	Cast,
	Face,
	ItemDrop,
	Message,
	Move,
	SystemMessage,
	Talk,
};