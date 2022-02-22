const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const Settings = require('../models/Settings.js');
const { getLanguage, createST } = require('../dbUtils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('settings')
		.setDescription('Modify the settings of the bot')
		.addStringOption(option =>
			option.setName('language')
				.setDescription('Change the language used')
				.setRequired(true)
				.addChoice('French', 'fr')
				.addChoice('English', 'en'),
		),
	async execute(interaction) {
		const guildId = interaction.guildId;

		const result = await getLanguage(guildId);
		const st = createST(result.langCode);

		if (interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
			const newLangCode = interaction.options.get('language').value;

			// Does the entry exist?
			Settings.findOne({ guildId: guildId }, (errorDB, langCode) => {
				if (errorDB) {
					console.error(errorDB);
					interaction.reply({ content:st.getST('Error'), ephemeral: true });
					return;
				}
				// If there is already a langCode we update it
				else if (langCode) {
					Settings.updateOne({ guildId: guildId }, { langCode: newLangCode }, (errorDBUpdate) => {
						if (errorDBUpdate) {
							console.error(errorDBUpdate);
							interaction.reply({ content:st.getST('ErrorRetryLater'), ephemeral: true });
						}
						else {
							st.lang = newLangCode;
							interaction.reply({ content:st.getST('SettingsUpdated'), ephemeral: true });
						}
					});
				}
				// No langCode detected so we create an entry in the DB
				else {
					langCode = new Settings({ guildId: guildId, langCode: newLangCode });
					langCode.save(errorDBsave => {
						if (errorDBsave) {
							console.error(errorDBsave);
							interaction.reply({ content:st.getST('ErrorRetryLater'), ephemeral: true });
						}
						else {
							st.lang = newLangCode;
							interaction.reply({ content:st.getST('SettingsSaved'), ephemeral: true });
						}
					});
				}
			});
		}
		else {
			interaction.reply({ content:st.getST('NotEnoughPermissions'), ephemeral: true });
			// console.log('NEP');
		}
	},
};