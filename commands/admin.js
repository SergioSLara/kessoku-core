const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('admin')
        .setDescription('Comando administrativo restrito.')
        .addStringOption(option =>
            option.setName('mensagem')
                .setDescription('Mensagem para o bot enviar')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    cooldown: 10,

    async execute(interaction) {
        const mensagem = interaction.options.getString('mensagem');
        await interaction.reply(`Admin disse: **${mensagem}**`);
    }
};