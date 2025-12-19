const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dado')
        .setDescription('Rola um dado e teste sua sorte!'),

    async execute(interaction) {
        const resultado = Math.floor(Math.random() * 6) + 1;
        await interaction.reply(`🎲 Você rolou o dado e caiu o número **${resultado}**`);
    }
};
