const { Events } = require('discord.js');
const logger = require('../utils/logger');

// ========================
// Evento: Bot Pronto
// ========================

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        logger.info(`Bot conectado como ${client.user.tag}`);
    }
};