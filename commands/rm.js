const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const RoleManager = require('../models/RoleManager.js');
const { getLanguage, createST } = require('../dbUtils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rm')
		.setDescription('Role Manager')
		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Create a reaction on a message that gives roles when the user react with it')
				.addStringOption(option => option.setName('msg_id').setDescription('The id of the message on which you want to add an emoji<->role association').setRequired(true))
				.addRoleOption(option => option.setName('role').setDescription('The role that you want a user to get when reacting on the specified emoji').setRequired(true))
				.addStringOption(option => option.setName('emoji').setDescription('The emoji that the user need to react with to get the specified role.').setRequired(true)),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('del')
				.setDescription('Delete the association between a reaction and a role')
				.addStringOption(option => option.setName('msg_id').setDescription('The id of the message on which you want to remove an emoji<->role association.').setRequired(true))
				.addRoleOption(option => option.setName('role').setDescription('A role. It will delete all associations where the provided role is involved'))
				.addStringOption(option => option.setName('emoji').setDescription('An emoji. It will delete all associations where the provided emoji is involved')),
		),
	async execute(interaction) {
		const guildId = interaction.guildId;

		const result = await getLanguage(guildId);
		const st = createST(result.langCode);

		if (interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
			if (interaction.options.getSubcommand() === 'add') {
				const msgId = interaction.options.get('msg_id').value;
				const roleId = interaction.options.get('role').value;
				const emoji = interaction.options.get('emoji').value;
				const channelId = interaction.channelId;
				// console.log(msgId, roleId, emoji, channelId);

				interaction.member.guild.channels.fetch(channelId).then(textChannel => {
					textChannel.messages.fetch(msgId).then(message => {

						// Check if the emoji<->role association on a message is already registered, if not create the association
						RoleManager.findOne({ messageId: msgId, roleId: roleId, emoji: emoji }, (errorDB, association) => {
							if (errorDB) {
								console.error(errorDB);
								interaction.reply({ content:st.getST('Error'), ephemeral: true });
								return;
							}
							else {
								message.react(emoji).then(() => {
									if (!association) {
										association = new RoleManager({ messageId: msgId, roleId: roleId, emoji: emoji });
										association.save(errorDBsave => {
											if (errorDBsave) {
												console.error(errorDBsave);
												interaction.reply({ content:st.getST('ErrorRetryLater'), ephemeral: true });
											}
											else {
												interaction.reply({ content:st.getST('AssociationAdded'), ephemeral: true });
											}
										});
									}
									else {
										interaction.reply({ content:st.getST('ErrorAssociationAlreadyRegistered'), ephemeral: true });
									}

								}).catch(error => {
									console.error(error); // Unknown Emoji
									interaction.reply({ content:st.getST('ErrorInvalidEmoji'), ephemeral: true });
								});
							}
						});

					}).catch(error => {
						console.error(error); // Unknown Message
						interaction.reply({ content:st.getST('ErrorUnknownMessage'), ephemeral: true });
					});

				}).catch(error => {
					console.error(error); // Error related to channel
					interaction.reply({ content:st.getST('Error'), ephemeral: true });
				});
			}
			else if (interaction.options.getSubcommand() === 'del') {
				const msgId = interaction.options.get('msg_id').value;
				const opt_roleId = interaction.options.get('role');
				const opt_emoji = interaction.options.get('emoji');
				const channelId = interaction.channelId;

				interaction.member.guild.channels.fetch(channelId).then(textChannel => {
					textChannel.messages.fetch(msgId).then(() => {

						// If only msgId is provided
						if (!opt_roleId && !opt_emoji) {
							RoleManager.deleteMany({ messageId: msgId }, (errorDB, report) => {
								if (errorDB) {
									console.error(errorDB);
									interaction.reply({ content:st.getST('Error'), ephemeral: true });
									return;
								}
								else {
									interaction.reply({ content:st.getST('AssociationDeleted', report.deletedCount), ephemeral: true });
								}
							});
						}
						// If one of the optional args is not provided
						else if (!opt_roleId || !opt_emoji) {
							if (opt_roleId) {
								const roleId = opt_roleId.value;
								RoleManager.deleteMany({ messageId: msgId, roleId: roleId }, (errorDB, report) => {
									if (errorDB) {
										console.error(errorDB);
										interaction.reply({ content:st.getST('Error'), ephemeral: true });
										return;
									}
									else {
										interaction.reply({ content:st.getST('AssociationDeleted', report.deletedCount), ephemeral: true });
									}
								});
							}
							else {
								const emoji = opt_emoji.value;
								RoleManager.deleteMany({ messageId: msgId, emoji: emoji }, (errorDB, report) => {
									if (errorDB) {
										console.error(errorDB);
										interaction.reply({ content:st.getST('Error'), ephemeral: true });
										return;
									}
									else {
										interaction.reply({ content:st.getST('AssociationDeleted', report.deletedCount), ephemeral: true });
									}
								});
							}
						}

					}).catch(error => {
						console.error(error); // Unknown Message
						interaction.reply({ content:st.getST('ErrorUnknownMessage'), ephemeral: true });
					});

				}).catch(error => {
					console.error(error); // Error related to channel
					interaction.reply({ content:st.getST('Error'), ephemeral: true });
				});

			}
		}
		else {
			interaction.reply({ content:'Only users with administrator flag can use this command', ephemeral: true });
			// console.log('NEP');
		}

	},
};