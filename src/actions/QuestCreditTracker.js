const { BattleText, Message } = require('../commands');

const tracker = {};
const creditTag = 'Quest Credit: ';

class QuestCreditTracker {
	static onCommand(command, proxy) {
		if (command.text && command.text.indexOf(creditTag) !== -1) {
			const questType = command.text.substr(creditTag.length);

			if ('undefined' === typeof tracker[questType]) {
				tracker[questType] = 1;
			} else {
				tracker[questType]++;
			}

			const message = new Message(Message.types.yellow, `[QUEST] Current session's credit count for '${questType}': ${tracker[questType]}`);

			proxy.writeToLocal(message.toCommandString());
		}
	}
}

QuestCreditTracker.triggers = [BattleText];

module.exports = QuestCreditTracker;
