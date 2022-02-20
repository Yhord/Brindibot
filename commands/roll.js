const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Generate a random number between 1 and 100'),
	async execute(interaction) {
		const number = Math.floor(Math.random() * 100) + 1;
		interaction.reply(`You rolled ${number}!`);
	},
};