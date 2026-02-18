import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bane um usuário do servidor')
    .addUserOption(option =>
        option
            .setName('user')
            .setDescription('Usuário a ser banido')
            .setRequired(true)
    )
    .addStringOption(option =>
        option
            .setName('reason')
            .setDescription('Motivo do banimento')
            .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

export async function execute(interaction: any) {
    try {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'Sem motivo especificado';
        const member = await interaction.guild.members.fetch(user.id);

        // usuário não encontrado
        if (!member) {
            return await interaction.reply({
                content: '❌ Usuário não encontrado no servidor.',
                ephemeral: true
            });
        }
        // impedindo auto-ban
        if (member.id === interaction.user.id) {
            return await interaction.reply({
                content: '❌ Você não pode se banir!',
                ephemeral: true
            });
        }
        // impedindo banimento de usuários com cargo igual ou superior
        if (member.roles.highest.position >= interaction.member.roles.highest.position) {
            return await interaction.reply({
                content: '❌ Você não tem permissão para banir este usuário (cargo igual ou superior).',
                ephemeral: true
            });
        }

        // Banir usuário
        await member.ban({ reason });

        const embed = new EmbedBuilder()
            .setTitle('⚠️ Usuário Banido')
            .setColor(0xff6b6b)
            .addFields(
                { name: '👤 Usuário', value: `${user.tag} (${user.id})`, inline: true },
                { name: '🔨 Moderador', value: interaction.user.tag, inline: true },
                { name: '📝 Motivo', value: reason, inline: false }
            )
            .setTimestamp();
        // canal.send({ embeds: [embed] }); // para enviar a um canal específico (canal = interaction.guild.channels.cache.get('ID_DO_CANAL'))
        // caso queira, trocar por channel.send para enviar em um canal específico
        await interaction.reply({ embeds: [embed] }); 

    } catch (error) {
        console.error('Erro ao banir usuário:', error);
        try {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: '❌ Erro ao banir o usuário.',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: '❌ Erro ao banir o usuário.',
                    ephemeral: true
                });
            }
        } catch (err) {
            console.error('Erro ao responder erro:', err);
        }
    }
}
