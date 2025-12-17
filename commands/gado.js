const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType
} = require('discord.js');

function gerarResultado(targetUser) {
    const base = Math.random();
    const porcentagem = Math.min(100, Math.floor((base ** 0.75) * 101));

    let frase, cor, rank, badge;

    if (porcentagem === 69) {
        frase = '🛐 **ILUMINADO.** Gado por opção filosófica.';
        cor = 0xFF69B4;
        rank = 'Místico';
        badge = '✨ RARO';
    } else if (porcentagem < 15) {
        frase = '🗿 **ALPHA SUPREMO.** Emoção desativada no BIOS.';
        cor = 0x2ECC71;
        rank = 'Imune';
    } else if (porcentagem < 35) {
        frase = '😎 **Controlado.** Conversa normal, zero pix.';
        cor = 0x1ABC9C;
        rank = 'Estável';
    } else if (porcentagem < 55) {
        frase = '🙂 **Suspeito.** Bom dia 🌹 detectado.';
        cor = 0xF1C40F;
        rank = 'Observação';
    } else if (porcentagem < 75) {
        frase = '🐂 **GADO CONFIRMADO.** Bancaria até o plano familiar.';
        cor = 0xE67E22;
        rank = 'Crítico';
    } else if (porcentagem < 95) {
        frase = '🤡 **GADO PREMIUM.** Defende com argumentos imaginários.';
        cor = 0xE74C3C;
        rank = 'Emergência';
    } else {
        frase = '👑 **REI ABSOLUTO DO GADO.** O chifre já tem CPF.';
        cor = 0x8E44AD;
        rank = 'Caso Perdido';
    }

    const totalBarras = 12;
    const barrasPreenchidas = Math.round((porcentagem / 100) * totalBarras);
    const barra = '🟩'.repeat(barrasPreenchidas) + '⬛'.repeat(totalBarras - barrasPreenchidas);

    const embed = new EmbedBuilder()
        .setColor(cor)
        .setTitle('🐄 Relatório Oficial de Gadice')
        .setDescription(`👤 **Alvo:** ${targetUser}\n📅 **Status:** Finalizado`)
        .addFields(
            { name: '📊 Medidor Científico', value: `${barra} **${porcentagem}%**` },
            { name: '🏷️ Classificação', value: `**${rank}**${badge ? `\n${badge}` : ''}`, inline: true },
            { name: '🧠 Diagnóstico', value: frase, inline: true }
        )
        .setThumbnail(targetUser.displayAvatarURL({ dynamic: true, size: 256 }))
        .setFooter({ text: 'Laboratório aprovado pelo Instituto Datacu' })
        .setTimestamp();

    return embed;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gado')
        .setDescription('🐄 Análise profunda de gadice (método questionável)')
        .addUserOption(option =>
            option
                .setName('alvo')
                .setDescription('Quem será submetido ao exame?')
                .setRequired(false)
        ),

    async execute(interaction) {
        const alvo = interaction.options.getUser('alvo') || interaction.user;

        const botaoReavaliar = new ButtonBuilder()
            .setCustomId('reavaliar_gado')
            .setLabel('🔁 Reavaliar')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder().addComponents(botaoReavaliar);

        await interaction.reply({
            content: `Iniciando análise complexa de ${alvo.username}`,
            fetchReply: true
        });

        await new Promise(r => setTimeout(r, 1500));

        const embedInicial = gerarResultado(alvo);

        const mensagem = await interaction.editReply({
            content: null,
            embeds: [embedInicial],
            components: [row]
        });

        const collector = mensagem.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 60000
        });

        collector.on('collect', async i => {

            if (i.customId !== 'reavaliar_gado') return;

            await i.update({
                content: `🔄 **Recalibrando satélites para ${alvo.username}...**`,
                embeds: [],
                components: []
            });

            await new Promise(r => setTimeout(r, 1000));

            const novoEmbed = gerarResultado(alvo);

            await i.editReply({
                content: null,
                embeds: [novoEmbed],
                components: [row]
            });
        });

        collector.on('end', () => {
            botaoReavaliar.setDisabled(true);
            botaoReavaliar.setLabel('Análise Encerrada');

            interaction.editReply({
                components: [new ActionRowBuilder().addComponents(botaoReavaliar)]
            }).catch(() => { });
        });
    }
};