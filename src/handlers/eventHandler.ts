import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { pink, blue, bold, reset } from '../utils/colors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async (client: any) => {
    const eventsPath = path.join(__dirname, '..', 'events');
    if (!fs.existsSync(eventsPath)) return;

    let eventCount = 0;

    const eventFolders = fs.readdirSync(eventsPath); // Lê as pastas dentro de /events

    for (const folder of eventFolders) {
        const folderPath = path.join(eventsPath, folder);

        const isDirectory = fs.lstatSync(folderPath).isDirectory();
        const files = isDirectory
            ? fs.readdirSync(folderPath).filter((f: string) => f.endsWith('.js'))
            : [folder].filter((f: string) => f.endsWith('.js'));

        for (const file of files) {
            const filePath = isDirectory ? path.join(folderPath, file) : path.join(eventsPath, file);
            const event = await import(pathToFileURL(filePath).href);

            if (!event?.name || typeof event.execute !== 'function') continue;

            if (event.once) {
                client.once(event.name, (...args: any[]) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args: any[]) => event.execute(...args, client));
            }

            eventCount++;
        }
    }

    console.log(`${pink}🎸 [Bocchi-Log]:${reset} A-Ah... eu carreguei ${blue}${bold}${eventCount}${reset} eventos...`);
};