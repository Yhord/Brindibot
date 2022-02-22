const { SlashCommandBuilder } = require('@discordjs/builders');
const { getLanguage, createST } = require('../dbUtils.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Generate a random number between 1 and 100')
		.addIntegerOption(option => option.setName('min').setDescription('Minimum roll'))
		.addIntegerOption(option => option.setName('max').setDescription('Maximum roll'),
		),
	async execute(interaction) {
		const guildId = interaction.guildId;

		const result = await getLanguage(guildId);
		const st = createST(result.langCode);

		const opt_min = interaction.options.get('min');
		const opt_max = interaction.options.get('max');

		let min = opt_min ? Math.abs(opt_min.value) : 1;
		let max = opt_max ? Math.abs(opt_max.value) : 100;

		if (min > max) {
			min = min ^ max;
			max = min ^ max;
			min = max ^ min;
		}

		const number = Math.floor(Math.random() * (max - min + 1) + min);
		interaction.reply(st.getST('RollResult', number, min, max));

	},
};