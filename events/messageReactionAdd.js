module.exports = {
	name: 'messageReactionAdd',
	async execute(messageReaction, user) {
		const RoleManager = require('../models/RoleManager.js');
		require('dotenv').config();

		try {
			messageReaction.fetch().then(msgReaction => {
				const msgId = msgReaction.message.id;
				const emoji = msgReaction.emoji.toString();
				const userId = user.id;
				// console.log(msgId, emoji, userId);

				// If the reaction is not added by the client (to avoid the client to gives itself roles)
				const discord_client_id = process.env.DISCORD_CLIENT_ID;
				if (!(user.id === discord_client_id)) {

					// Fetching the GuildMember object so we can add roles
					msgReaction.message.guild.members.fetch(userId).then(guildMember => {

						// Getting emoji<->roles associations
						RoleManager.find({ messageId: msgId, emoji: emoji }, (errorDB, associations) => {
							if (errorDB) {
								console.error(errorDB);
								return;
							}

							if (associations) {
								// console.log(associations);
								associations.forEach(function(association) {
									guildMember.roles.add(association.roleId).catch(error => {
										console.error(error);
									});
								});
							}
						});

					}).catch(error => {
						console.error(error);
					});

				}

			}).catch(error => {
				console.error(error);
			});
		}
		catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
	},
};
