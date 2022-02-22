const Settings = require('./models/Settings.js');
const SimpleTranslation = require('./SimpleTranslation.js');

function getLanguage(guildId) {
	try {
		return Settings.findOne({ guildId: guildId });
	}
	catch (errorDB) {
		console.error(errorDB);
		return;
	}
}

function createST(langCode) {
	return new SimpleTranslation('en', langCode);
}

module.exports = { getLanguage, createST };