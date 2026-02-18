import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Remove o silêncio de um usuário')
    .addUserOption(option =>
        option
            .setName('user')
            .setDescription('Usuário para remover silêncio')
            .setRequired(true)
    )
    .addStringOption(option =>
        option
            .setName('reason')
            .setDescription('Motivo da remoção')
            .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export async function execute(interaction: any) {
    try {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'Sem motivo especificado';
        const member = await interaction.guild.members.fetch(user.id);

        // Usuário não encontrado
        if (!member) {
            return await interaction.reply({
                content: '❌ Usuário não encontrado no servidor.',
                ephemeral: true
            });
        }
        // Usuário não silenciado
        if (!member.isCommunicationDisabled()) {
            return await interaction.reply({
                content: '❌ Este usuário não está silenciado.',
                ephemeral: true
            });
        }

        // Remover mute
        await member.timeout(null, reason);

        const embed = new EmbedBuilder()
            .setTitle('🔊 Silêncio Removido')
            .setColor(0x4caf50)
            .addFields(
                { name: '👤 Usuário', value: `${user.tag} (${user.id})`, inline: true },
                { name: '🔨 Moderador', value: interaction.user.tag, inline: true },
                { name: '📝 Motivo', value: reason, inline: false }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Erro ao remover silêncio:', error);
        try {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: '❌ Erro ao remover silêncio do usuário.',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: '❌ Erro ao remover silêncio do usuário.',
                    ephemeral: true
                });
            }
        } catch (err) {
            console.error('Erro ao responder erro:', err);
        }
    }
}
