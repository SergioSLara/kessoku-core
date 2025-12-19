const { Client, GatewayIntentBits, Collection, EmbedBuilder, ActivityType } = require('discord.js')

const fs = require('fs')
const path = require('path')
const { token } = require('./config.json')

// ==============================
// Configuração do cliente
// ==============================
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages]
})
client.commands = new Collection()

// ==========================
// Carregamento de comandos
// ==========================
console.log('\n┌───────────────────────────────────────────┐')
console.log('│ 🎸 BOOTING… Sistema da Bocchi acordando   │')
console.log('└───────────────────────────────────────────┘')

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'))

let loadedCount = 0

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    if (command?.data?.name && typeof command.execute === 'function') {
        client.commands.set(command.data.name, command)
        loadedCount++
    } else {
        console.warn(`[⚠️] O comando (${file}) está incompleto: Não existe "data.name" ou "execute" no arquivo.`)
    }
}

console.log(`\n✨ ${loadedCount} comandos afinados e prontos para o palco.\n`)

// ===========================
// Tratamento de Interações
// ===========================
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return

    const command = client.commands.get(interaction.commandName)
    if (!command) return

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(`Erro ao executar /${interaction.commandName}:`, error)

        const errorEmbed = new EmbedBuilder()
            .setColor('Red')
            .setTitle('Eita! Algo deu errado…')
            .setDescription(
                'Tentei tocar essa nota, mas minha mão tremeu.\n' +
                '*Por favor, tente novamente em alguns instantes.*'
            )
            .setFooter({ text: 'Código do erro: BOCCHI_PANIC_MODE' })

        const response = {
            embeds: [errorEmbed],
            ephemeral: true
        }

        if (interaction.deferred || interaction.replied) {
            await interaction.editReply(response)
        } else {
            await interaction.reply(response)
        }
    }
})

// =============
// Bot online
// =============
client.once('ready', () => {
    console.log('┌───────────────────────────────────────────┐')
    console.log('│ ✅ LOGIN CONCLUÍDO COM SUCESSO            │')
    console.log('│ 🎸 Bocchi está viva e conectada           │')
    console.log('└───────────────────────────────────────────┘')

    // Lista de atividades que a Bocchi alterna
    const statusOptions = [
        { name: 'Guitar Hero no quarto', type: ActivityType.Playing },
        { name: 'Kessoku Band no Spotify', type: ActivityType.Listening },
        { name: 'vídeos de guitarra no YouTube', type: ActivityType.Watching },
        { name: 'tentando socializar (e falhando)', type: ActivityType.Playing },
        { name: 'dentro de uma caixa de manga', type: ActivityType.Playing },
        { name: 'fugindo de responsabilidades', type: ActivityType.Competing }
    ]

    let counter = 0

    const updateStatus = () => {
        const currentStatus = statusOptions[counter]

        client.user.setPresence({
            activities: [{
                name: currentStatus.name,
                type: currentStatus.type
            }],
            status: 'online'
        })

        counter = (counter + 1) % statusOptions.length
    }

    updateStatus()
    setInterval(updateStatus, 10_000) // atualiza a cada 10 segundos
})
client.login(token)
