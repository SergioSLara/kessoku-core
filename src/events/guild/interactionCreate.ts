import { Events, Collection } from 'discord.js';

export const name = Events.InteractionCreate;

export async function execute(interaction: any) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`Nenhum comando correspondente a ${interaction.commandName} foi encontrado.`);
        return;
    }

    try {
        // DEFER IMEDIATAMENTE para evitar timeout de 3 segundos do Discord
        if (!interaction.deferred && !interaction.replied) {
            await interaction.deferReply();
        }
    } catch (error) {
        console.error('Erro ao deferir interação:', error);
        return;
    }

    // =================
    // trata cooldowns
    // =================
    
    const { cooldowns } = interaction.client;

    if (!cooldowns.has(command.data.name)) {
        cooldowns.set(command.data.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 3;
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

    if (timestamps.has(interaction.user.id)) {
        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

        if (now < expirationTime) {
            const expiredTimestamp = Math.round(expirationTime / 1000);
            try {
                await interaction.editReply({
                    content: `Por favor, espere <t:${expiredTimestamp}:R> para usar o comando \`${command.data.name}\` novamente.`,
                });
            } catch (err) {
                console.error('Erro ao responder cooldown:', err);
            }
            return;
        }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    // ==========================
    // tenta executar o comando
    // ==========================
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        try {
            await interaction.editReply({ content: 'Ocorreu um erro ao executar esse comando!', ephemeral: true });
        } catch (err) {
            console.error('Erro ao responder erro:', err);
        }
    }
}