import fs from 'fs';
import path from 'path';
import { Collection } from 'discord.js';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { pink, blue, bold, reset } from '../constants/colors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async (client: any) => {
    client.commands = new Collection();

    const commandsPath = path.join(__dirname, '..', 'commands');
    if (!fs.existsSync(commandsPath)) return;

    const commandFolders = fs.readdirSync(commandsPath);

    for (const folder of commandFolders) {
        const folderPath = path.join(commandsPath, folder);

        if (fs.lstatSync(folderPath).isDirectory()) {
            const commandFiles = fs.readdirSync(folderPath).filter((file: string) => file.endsWith('.js'));

            for (const file of commandFiles) {
                const filePath = path.join(folderPath, file);
                const command = await import(pathToFileURL(filePath).href);

                if (command?.data?.name && typeof command.execute === 'function') {
                    client.commands.set(command.data.name, command);
                }
            }
        } else if (folder.endsWith('.js')) {
            const command = await import(pathToFileURL(folderPath).href);
            if (command?.data?.name && typeof command.execute === 'function') {
                client.commands.set(command.data.name, command);
            }
        }
    }
    console.log(`${pink}🎸 [Bocchi-Log]:${reset} S-são ${blue}${bold}${client.commands.size}${reset} comandos carregados...`);
};