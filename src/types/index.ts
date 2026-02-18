import { Client, Collection } from 'discord.js';

export interface ExtendedClient extends Client {
    cooldowns: Collection<string, Collection<string, number>>;
    commands: Collection<string, any>;
}

export interface CommandData {
    name: string;
    description: string;
    execute: (interaction: any) => Promise<void>;
}

export interface EventData {
    name: string;
    once?: boolean;
    execute: (...args: any[]) => Promise<void>;
}
