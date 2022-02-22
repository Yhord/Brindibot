const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
	guildId: { type: String, unique: true },
	langCode: String,
});

module.exports = mongoose.model('Settings', SettingsSchema);