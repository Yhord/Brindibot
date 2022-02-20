const mongoose = require('mongoose');

const RoleManagerSchema = new mongoose.Schema({
	messageId: String,
	roleId: String,
	emoji: String,
});

module.exports = mongoose.model('RoleManager', RoleManagerSchema);