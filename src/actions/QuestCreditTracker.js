const { BattleText, Message } = require('../commands/server');

const creditTag = 'Quest Credit: ';

class QuestCreditTracker {
	static onCommand(/** BattleText */ command, /** Session */ session) {
		if (!session.activePlayer) {
			return;
		}

		if (command.text && command.text.indexOf(creditTag) !== -1) {
			const questType = command.text.substr(creditTag.length);

			if ('undefined' === typeof session.activePlayer.meta.questsCredits) {
				session.activePlayer.meta.questsCredits = {};
			}

			if ('undefined' === typeof session.activePlayer.meta.questsCredits[questType]) {
				session.activePlayer.meta.questsCredits[questType] = 1;
			} else {
				session.activePlayer.meta.questsCredits[questType]++;
			}

			const message = new Message(Message.types.yellow, `[QUEST] '${questType}': ${session.activePlayer.meta.questsCredits[questType]}`);

			session.writeToLocal(message.toCommandString());
		}
	}
}

QuestCreditTracker.triggers = [BattleText];

module.exports = QuestCreditTracker;
