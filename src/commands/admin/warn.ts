import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Avisa um usuário sobre seu comportamento')
    .addUserOption(option =>
        option
            .setName('user')
            .setDescription('Usuário a ser avisado')
            .setRequired(true)
    )
    .addStringOption(option =>
        option
            .setName('reason')
            .setDescription('Motivo do aviso')
            .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export async function execute(interaction: any) {
    try {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const member = await interaction.guild.members.fetch(user.id);

        // Verificações
        if (!member) {
            return await interaction.reply({
                content: '❌ Usuário não encontrado no servidor.',
                ephemeral: true
            });
        }

        if (member.id === interaction.user.id) {
            return await interaction.reply({
                content: '❌ Você não pode se avisar!',
                ephemeral: true
            });
        }

        if (member.roles.highest.position >= interaction.member.roles.highest.position) {
            return await interaction.reply({
                content: '❌ Você não tem permissão para avisar este usuário (cargo igual ou superior).',
                ephemeral: true
            });
        }

        // Enviar DM ao usuário
        try {
            const dmEmbed = new EmbedBuilder()
                .setTitle('⚠️ Você Recebeu um Aviso')
                .setColor(0xffff00)
                .addFields(
                    { name: '📍 Servidor', value: interaction.guild.name },
                    { name: '🔨 Moderador', value: interaction.user.tag },
                    { name: '📝 Motivo', value: reason }
                )
                .setTimestamp();

            await user.send({ embeds: [dmEmbed] });
        } catch (dmError) {
            console.log('Não foi possível enviar DM ao usuário');
        }

        // Resposta pública
        const embed = new EmbedBuilder()
            .setTitle('⚠️ Aviso Emitido')
            .setColor(0xffff00)
            .addFields(
                { name: '👤 Usuário', value: `${user.tag} (${user.id})`, inline: true },
                { name: '🔨 Moderador', value: interaction.user.tag, inline: true },
                { name: '📝 Motivo', value: reason, inline: false }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Erro ao avisar usuário:', error);
        try {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: '❌ Erro ao avisar o usuário.',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: '❌ Erro ao avisar o usuário.',
                    ephemeral: true
                });
            }
        } catch (err) {
            console.error('Erro ao responder erro:', err);
        }
    }
}
