import { Events } from 'discord.js';

export const name = Events.VoiceStateUpdate;
export const once = false;

export function execute(oldState: any, newState: any) {
    // Este evento é acionado quando há alteração de estado de voz
    // Exemplo: alguém entra/sai de um canal de voz
    // Você pode adicionar lógica aqui se necessário
}
