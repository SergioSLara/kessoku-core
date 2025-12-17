const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Responde com Pong!'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Pong!')
        .setDescription('Este é o ping do bot.');

        const botao = new ButtonBuilder()
        .setCustomId('ping_refresh')
        .setLabel('Atualizar')
        .setStyle(ButtonStyle.Primary);

        await interaction.reply({
            embeds: [embed],
            components: [new ActionRowBuilder().addComponents(botao)]
        });
    }
}