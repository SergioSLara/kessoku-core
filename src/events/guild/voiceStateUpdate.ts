import { Events } from 'discord.js';

export const name = Events.VoiceStateUpdate;
export const once = false;

export function execute(oldState: any, newState: any) {
    // Usuário entrou em um canal de voz
    if (newState.channelId && !oldState.channelId) {
        console.log(`🔊 ${newState.member.user.tag} entrou no canal de voz: ${newState.channel.name}`)
        }
        // Uusuário saiu de um canal de voz
    if (oldState.channelId && !newState.channelId)
            console.log(`🔇 ${oldState.member.user.tag} saiu do canal de voz: ${oldState.channel.name}`
            
        );
        // Usuário mudou de canal de voz
        if (oldState.channelId !== newState.channelId) {
            console.log(`📢 ${newState.member.user.tag} mudou de canal de voz de ${oldState.channel ? oldState.channel.name : 'Nenhum'} para 
                ${newState.channel ? newState.channel.name : 'Nenhum'}`);
        }
}
