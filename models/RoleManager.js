const mongoose = require('mongoose');

const RoleManagerSchema = new mongoose.Schema({
	messageId: { type: String, required: true },
	roleId: { type: String, required: true },
	emoji: { type: String, required: true },
});

module.exports = mongoose.model('RoleManager', RoleManagerSchema);