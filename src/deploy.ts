import { REST, Routes } from 'discord.js';
import config from '../config.json' with { type: 'json' };
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { pink, blue, bold, reset } from './utils/colors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { DISCORD_TOKEN, API_CLIENT, SERVIDOR } = config;

// =========================
// Deploy de comandos
// =========================

export default async () => {
    const commands: any[] = [];
    const commandsPath = path.join(__dirname, 'commands');

    try {
        const commandFolders = fs.readdirSync(commandsPath);
        for (const folder of commandFolders) {
            const folderPath = path.join(commandsPath, folder);

            try {
                if (fs.lstatSync(folderPath).isDirectory()) {
                    const commandFiles = fs.readdirSync(folderPath).filter((file: string) => file.endsWith('.js'));
                    for (const file of commandFiles) {
                        const filePath = path.join(folderPath, file);
                        const command = await import(pathToFileURL(filePath).href);
                        if (command?.data?.toJSON) {
                            commands.push(command.data.toJSON());
                        }
                    }
                } else if (folder.endsWith('.js')) {
                    const command = await import(pathToFileURL(folderPath).href);
                    if (command?.data?.toJSON) {
                        commands.push(command.data.toJSON());
                    }
                }
            } catch (error) {
                console.warn(`Erro ao carregar comando de ${folder}:`, error);
            }
        }

        const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

        console.log(`${pink}🎸 [Bocchi-Deploy]:${reset} S-sincronizando todos os comandos...`);

        await rest.put(
            Routes.applicationGuildCommands(API_CLIENT, SERVIDOR),
            { body: commands }
        );

        console.log(`${pink}✅ [Bocchi-Deploy]:${reset} ${blue}${bold}${commands.length}${reset} comandos sincronizados!`);
    } catch (error) {
        console.error(`${pink}🎸 [Bocchi-Error]:${reset} A Bocchi teve um ataque de pânico no deploy:`, error);
    }
};