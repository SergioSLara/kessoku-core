import { Events, EmbedBuilder } from 'discord.js';
import config from '../../../config.json' with { type: 'json' };

const { CANAL_SAIDA_SERVIDOR } = config;

export const name = Events.GuildMemberRemove;
export const once = false;

export async function execute(member: any) {
    try {
        const canal = member.guild.channels.cache.get(CANAL_SAIDA_SERVIDOR);
        if (!canal) return;

        // frases de despedida no estilo Bocchi the Rock.
        const frases = [
            'alguém foi embora… Bocchi entrou em curto-circuito.',
            'uma presença a menos. a pressão social caiu 5%...',
            'parece que alguém saiu. eu deveria ter dito tchau? *pânico*',
            'despedidas são difíceis. vou me esconder na minha caixa.',
            'o amplificador continua aqui. o palco ficou mais vazio.'
        ];

        const frase = frases[Math.floor(Math.random() * frases.length)];

        const embed = new EmbedBuilder()
            .setColor('#706fd3')
            .setTitle('📦 Menos um integrante na banda...')
            .setDescription(
                `**"${frase}"**\n\n` +
                `**${member.user.username}** abandonou o palco.\n` +
                `agora restam apenas **${member.guild.memberCount}** de nós aqui.\n\n` +
                `*Bocchi está processando a partida...*`
            )
            .setThumbnail(member.user.displayAvatarURL({ forceStatic: false, size: 512 }))
            .setFooter({
                text: 'Bocchi está observando o vazio...',
                iconURL: member.guild.iconURL() ?? ''
            })
            .setTimestamp();

        await canal.send({ embeds: [embed] });
    } catch (error) {
        console.error('Erro ao processar saída de membro:', error);
    }
}