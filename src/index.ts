import { Events, Client, GatewayIntentBits, Collection } from 'discord.js';
import * as colors from './utils/colors.js'; // Lembre-se do .js no final para ESM
import config from '../config.json' with { type: 'json' };
import deployCommands from './deploy.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ExtendedClient extends Client {
    cooldowns: Collection<string, Collection<string, number>>;
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildVoiceStates,
    ],
}) as ExtendedClient;

client.cooldowns = new Collection();

// Handler global para erros não capturados
client.on('error', (error) => {
    console.error('Erro do cliente Discord:', error);
});

process.on('unhandledRejection', (reason) => {
    console.error('Promise rejection não capturada:', reason);
});

// =========================
// Início do bot
// =========================

(async () => {
    process.stdout.write(colors.clear);
    console.log(colors.clear);

    console.log(`${colors.pink}╔═══════════════════════════════════════════╗${colors.reset}`);
    console.log(
        `${colors.pink}║${colors.reset}   🎸 ${colors.bold}BOOTING...${colors.reset} Sistema Kessoku Core      ${colors.pink}║${colors.reset}`
    );
    console.log(`${colors.pink}╚═══════════════════════════════════════════╝${colors.reset}\n`);

    await deployCommands();

    const commandHandler = await import('./handlers/commandHandler.js');
    const eventHandler = await import('./handlers/eventHandler.js');

    await commandHandler.default(client);
    await eventHandler.default(client);

    client.login(config.DISCORD_TOKEN);
})();