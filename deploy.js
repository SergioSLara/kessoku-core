const { REST, Routes } = require('discord.js')
const { token, clientId, guildId } = require('./config.json')
const fs = require('fs')
const path = require('path')

const mode = process.argv[2]

if (!mode || !['dev', 'prod', 'clear'].includes(mode)) {
    console.log(`
🎸 Bocchi travou por um segundo…
Ela não entendeu qual modo você quer usar.

────────────────────────────────────
        COMO USAR O DEPLOY
────────────────────────────────────
 node deploy.js dev     → comandos no SERVIDOR (rápido)
 node deploy.js prod    → comandos GLOBAIS (lento)
 node deploy.js clear   → remove TODOS os comandos
────────────────────────────────────

💡 Dica: use "dev" para testar e "prod" só quando estiver tudo pronto.
`)

    process.exit(0)
}

if (!token || !clientId || !guildId) {
    console.error('❌ Erro: Verifique se token, clientId e guildId estão no config.json')
    process.exit(1)
}

const commands = []
const commandsPath = path.join(__dirname, 'commands')

// =====================================
// Verifica se a pasta commands existe
// =====================================
if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'))
    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file))
        if (command?.data) {
            commands.push(command.data.toJSON())
        } else {
            console.warn(`⚠️ O comando ${file} está faltando a propriedade "data".`)
        }
    }
} else {
    console.error('❌ A pasta "commands" não foi encontrada!')
    process.exit(1)
}

const rest = new REST({ version: '10' }).setToken(token)

    ; (async () => {
        try {
            console.log(`Carregando ${commands.length} comandos...`)

            if (mode === 'clear') {
                console.log('Iniciando limpeza total...')

                console.log('...Apagando comandos locais do servidor...')
                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: [] }
                )

                console.log('...Apagando comandos globais...')
                await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: [] }
                )

                console.log('Tudo limpo! A ansiedade da Bocchi sumiu.')
                return
            }
            
            if (mode === 'dev') {
                console.log('Registrando comandos no servidor...')

                const data = await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: commands }
                )

                console.log(`✅ ${data.length} comandos registrados com sucesso no servidor:\n`)

                data.forEach(cmd => {
                    console.log(`• /${cmd.name}`)
                    console.log(`\n`)
                })
            }


            if (mode === 'prod') {
                console.log('Registrando comandos globais...')
                const data = await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: commands }
                )
                console.log(`⏳ Sucesso! ${data.length} comandos globais enviados.`)
                console.log('(Pode levar até 1 hora para aparecer em todos os servidores)')
            }

        } catch (error) {
            console.error('A Bocchi teve um ataque de pânico (Erro):')

            if (error.status === 404) {
                console.error('ERRO 404: ID do Cliente ou ID do Servidor (Guild) estão errados.')
            } else {
                console.error(error)
            }
        }
    })()