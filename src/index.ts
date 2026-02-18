import 'dotenv/config';
import { Events, Client, GatewayIntentBits, Collection } from 'discord.js';
import * as colors from './constants/colors.js';
import config from '../config.json' with { type: 'json' };
import deployCommands from './deploy.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ExtendedClient } from './types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.DISCORD_TOKEN) {
    console.error('❌ ERRO: DISCORD_TOKEN não encontrado no arquivo .env');
    process.exit(1);
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
client.commands = new Collection();

// Handler global para erros não capturados
client.on('error', (error: Error) => {
    console.error('❌ Erro do cliente Discord:', error);
});

process.on('unhandledRejection', (reason: unknown) => {
    console.error('❌ Promise rejection não capturada:', reason);
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

    await client.login(process.env.DISCORD_TOKEN);
})();