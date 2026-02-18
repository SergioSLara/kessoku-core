import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('jokenpo')
    .setDescription('Jogue Pedra, Papel ou Tesoura contra o bot!')
    .addStringOption(option =>
        option
            .setName('escolha')
            .setDescription('Sua escolha')
            .setRequired(true)
            .addChoices(
                { name: '🪨 Pedra', value: 'pedra' },
                { name: '📄 Papel', value: 'papel' },
                { name: '✂️ Tesoura', value: 'tesoura' }
            )
    );

export async function execute(interaction: any) {
    try {
        const escolhaUsuario = interaction.options.getString('escolha');
        const opcoes = ['pedra', 'papel', 'tesoura'];
        const escolhaBot = opcoes[Math.floor(Math.random() * opcoes.length)] as string;

        let resultado = '';
        let cor = 0xffa500;

        if (escolhaUsuario === escolhaBot) {
            resultado = '🤝 Empate!';
            cor = 0xffff00;
        } else if (
            (escolhaUsuario === 'pedra' && escolhaBot === 'tesoura') ||
            (escolhaUsuario === 'papel' && escolhaBot === 'pedra') ||
            (escolhaUsuario === 'tesoura' && escolhaBot === 'papel')
        ) {
            resultado = '🎉 Você venceu!';
            cor = 0x00ff00;
        } else {
            resultado = '😔 Você perdeu!';
            cor = 0xff0000;
        }

        const emojiChoices: Record<string, string> = {
            pedra: '🪨',
            papel: '📄',
            tesoura: '✂️'
        };

        const botEmoji = emojiChoices[escolhaBot] || '❓';
        const botNome = escolhaBot.charAt(0).toUpperCase() + escolhaBot.slice(1);

        const embed = new EmbedBuilder()
            .setTitle('🎮 Pedra, Papel ou Tesoura')
            .setColor(cor)
            .addFields(
                { name: '👤 Sua Escolha', value: `${emojiChoices[escolhaUsuario]} ${escolhaUsuario.charAt(0).toUpperCase() + escolhaUsuario.slice(1)}`, inline: true },
                { name: '🤖 Escolha do Bot', value: `${botEmoji} ${botNome}`, inline: true },
                { name: '📊 Resultado', value: resultado, inline: false }
            )
            .setFooter({ text: 'Use /jokenpo novamente para jogar' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Erro ao jogar jokenpo:', error);
        try {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: '❌ Erro ao jogar jokenpo.',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: '❌ Erro ao jogar jokenpo.',
                    ephemeral: true
                });
            }
        } catch (err) {
            console.error('Erro ao responder erro do jokenpo:', err);
        }
    }
}
