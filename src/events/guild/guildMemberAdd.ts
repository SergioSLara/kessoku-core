import { Events, EmbedBuilder } from 'discord.js';
import config from '../../../config.json' with { type: 'json' };

const { CANAL_ENTRADA_SERVIDOR } = config;

export const name = Events.GuildMemberAdd;
export const once = false;

export async function execute(member: any) {
    try {
        const canal = member.guild.channels.cache.get(CANAL_ENTRADA_SERVIDOR);
        if (!canal) return;

        // frases de boas-vindas no estilo Bocchi the Rock.
        const frasesBocchi = [
            'AHHH! Uma nova pessoa?! *Bocchi entra em modo glitch*',
            'Alguém chegou... rápido, me deem uma caixa de papelão!',
            'Um novo integrante... será que vão me forçar a fazer contato visual?',
            'Entrada detectada. Minha bateria social já caiu para 0%...',
            'Mais um membro para a Kessoku Band? (Espero que não precise falar no microfone)'
        ];

        const frase = frasesBocchi[Math.floor(Math.random() * frasesBocchi.length)];

        const embed = new EmbedBuilder()
            .setColor('#ff9ff3')
            .setTitle('🎸 N-Novo integrante detectado!')
            .setDescription(
                `**"${frase}"**\n\n` +
                `Seja bem-vindo(a) ${member}! \n` +
                `Agora temos **${member.guild.memberCount}** pessoas para eu tentar não ignorar sem querer.`
            )
            .setThumbnail(member.user.displayAvatarURL({ forceStatic: false, size: 512 }))
            .setImage('https://media.tenor.com/89S0e4B0m38AAAAC/bocchi-the-rock-bocchi.gif')
            .setFooter({ text: 'Bocchi the Bot • Tentando manter a calma', iconURL: member.guild.iconURL() ?? '' })
            .setTimestamp();

        await canal.send({ content: `||<@${member.id}>||`, embeds: [embed] });
    } catch (error) {
        console.error('Erro ao processar nova entrada de membro:', error);
    }
}