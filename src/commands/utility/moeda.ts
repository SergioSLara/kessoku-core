import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('moeda')
    .setDescription('Jogue cara ou coroa!')
    .addStringOption(option =>
        option
            .setName('aposta')
            .setDescription('Sua aposta')
            .setRequired(true)
            .addChoices(
                { name: '👑 Cara', value: 'cara' },
                { name: '🪙 Coroa', value: 'coroa' }
            )
    );

export async function execute(interaction: any) {
    try {
        const apostaDUsuario = interaction.options.getString('aposta');
        const resultado = Math.random() < 0.5 ? 'cara' : 'coroa';

        const ganhou = apostaDUsuario === resultado;
        const cor = ganhou ? 0x00ff00 : 0xff0000;
        const emoji = ganhou ? '🎉' : '😔';
        const status = ganhou ? 'VOCÊ GANHOU!' : 'VOCÊ PERDEU!';

        const emojiResult = resultado === 'cara' ? '👑' : '🪙';

        const embed = new EmbedBuilder()
            .setTitle('🎮 Cara ou Coroa')
            .setColor(cor)
            .addFields(
                { name: '🎲 Resultado', value: `${emojiResult} ${resultado.toUpperCase()}`, inline: true },
                { name: '📊 Status', value: `${emoji} ${status}`, inline: true }
            )
            .setFooter({ text: 'Use /moeda novamente para jogar' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Erro ao jogar moeda:', error);
        try {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: '❌ Erro ao jogar cara ou coroa.',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: '❌ Erro ao jogar cara ou coroa.',
                    ephemeral: true
                });
            }
        } catch (err) {
            console.error('Erro ao responder erro da moeda:', err);
        }
    }
}
