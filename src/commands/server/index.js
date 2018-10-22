const BattleText = require('./BattleText');
const ItemDrop = require('./ItemDrop');
const MakeCharacter = require('./MakeCharacter');
const Message = require('./Message');
const SystemMessage = require('./SystemMessage');

const commandSeparator = String.fromCharCode(0x01);

module.exports = {
	BattleText,
	ItemDrop,
	MakeCharacter,
	Message,
	SystemMessage,
	commandSeparator,
};
