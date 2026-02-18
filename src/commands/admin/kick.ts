import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Expulsa um usuário do servidor')
    .addUserOption(option =>
        option
            .setName('user')
            .setDescription('Usuário a ser expulso')
            .setRequired(true)
    )
    .addStringOption(option =>
        option
            .setName('reason')
            .setDescription('Motivo da expulsão')
            .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers);

export async function execute(interaction: any) {
    try {
        const user = interaction.options.getUser('user');
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
                content: '❌ Você não pode se expulsar!',
                ephemeral: true
            });
        }

        if (member.roles.highest.position >= interaction.member.roles.highest.position) {
            return await interaction.reply({
                content: '❌ Você não tem permissão para expulsar este usuário (cargo igual ou superior).',
                ephemeral: true
            });
        }

        // Expulsar usuário
        await member.kick(reason);

        const embed = new EmbedBuilder()
            .setTitle('👢 Usuário Expulso')
            .setColor(0xffa500)
            .addFields(
                { name: '👤 Usuário', value: `${user.tag} (${user.id})`, inline: true },
                { name: '🔨 Moderador', value: interaction.user.tag, inline: true },
                { name: '📝 Motivo', value: reason, inline: false }
            )
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] }); 

    } catch (error) {
        console.error('Erro ao expulsar usuário:', error);
        try {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: '❌ Erro ao remover o usuário.',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: '❌ Erro ao remover o usuário.',
                    ephemeral: true
                });
            }
        } catch (err) {
            console.error('Erro ao responder erro:', err);
        }
    }
}
