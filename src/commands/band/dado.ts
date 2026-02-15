import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('dado')
    .setDescription('Rola um dado e teste sua sorte!');

export async function execute(interaction: ChatInputCommandInteraction) {
    try {
        const resultado = Math.floor(Math.random() * 6) + 1;

        await interaction.editReply({
            content: `🎲 Você rolou o dado e caiu o número **${resultado}**`
        });

    } catch (error) {
        console.error('Erro ao executar o comando dado:', error);

        try {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Houve um erro ao rolar o dado...', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Houve um erro ao rolar o dado...', ephemeral: true });
            }
        } catch (err) {
            console.error('Erro ao responder erro do dado:', err);
        }
    }
}