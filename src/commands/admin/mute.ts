import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, time } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Silencia um usuário por um tempo especificado')
    .addUserOption(option =>
        option
            .setName('user')
            .setDescription('Usuário a ser silenciado')
            .setRequired(true)
    )
    .addIntegerOption(option =>
        option
            .setName('duration')
            .setDescription('Duração do silêncio em minutos (máx 40320)')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(40320)
    )
    .addStringOption(option =>
        option
            .setName('reason')
            .setDescription('Motivo do silêncio')
            .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export async function execute(interaction: any) {
    try {
        const user = interaction.options.getUser('user');
        const duration = interaction.options.getInteger('duration');
        const reason = interaction.options.getString('reason') || 'Sem motivo especificado';
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
                content: '❌ Você não pode se silenciar!',
                ephemeral: true
            });
        }

        if (member.roles.highest.position >= interaction.member.roles.highest.position) {
            return await interaction.reply({
                content: '❌ Você não tem permissão para silenciar este usuário.',
                ephemeral: true
            });
        }

        // Converter minutos para milissegundos
        const durationMs = duration * 60 * 1000;

        // Silenciar usuário
        await member.timeout(durationMs, reason);

        const embed = new EmbedBuilder()
            .setTitle('🔇 Usuário Silenciado')
            .setColor(0x9c27b0)
            .addFields(
                { name: '👤 Usuário', value: `${user.tag} (${user.id})`, inline: true },
                { name: '⏱️ Duração', value: `${duration} minuto${duration > 1 ? 's' : ''}`, inline: true },
                { name: '🔨 Moderador', value: interaction.user.tag, inline: true },
                { name: '📝 Motivo', value: reason, inline: false }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Erro ao silenciar usuário:', error);
        try {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: '❌ Erro ao silenciar o usuário.',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: '❌ Erro ao silenciar o usuário.',
                    ephemeral: true
                });
            }
        } catch (err) {
            console.error('Erro ao responder erro:', err);
        }
    }
}
