import { Events } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';
import { pink, blue, bold, reset, red } from '../../utils/colors.js';
import config from '../../../config.json' with { type: 'json' };

export const name = Events.ClientReady;
export const once = true;

export function execute(client: any) {
    console.log(`${pink}✨ [Bocchi-Log]:${reset} ${blue}${bold}${client.user.tag}${reset} está online!`);

    // Conectar ao canal de voz
    try {
        const guild = client.guilds.cache.get(config.SERVIDOR);
        if (guild) {
            const channel = guild.channels.cache.get(config.CANAL_VOZ);
            if (channel && channel.type === 2) {
                joinVoiceChannel({
                    channelId: channel.id,
                    guildId: guild.id,
                    adapterCreator: guild.voiceAdapterCreator,
                    selfDeaf: true,
                });
                console.log(`${pink}🎧 [Bocchi-Log]:${reset} ${bold}${client.user.username}${reset} entrou na call de voz.`);
            }
        }
    } catch (error) {
        console.error('Erro ao conectar ao canal de voz:', error);
    }
}
