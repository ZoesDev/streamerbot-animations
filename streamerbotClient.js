// streamerbotClient.js
import { StreamerbotClient } from '@streamerbot/client';
import { debugLog } from './utils.js';  // We'll import the debugLog function
import 'dotenv/config';

// Create a new client with Streamer.bot
const client = new StreamerbotClient({
    host: process.env.streamerbotHost,
    port: process.env.streamerbotPort,
    autoReconnect: true,
    retries: -1,
});

// Function to send a message to Streamer.bot chat (Twitch or YouTube)
const sendMessageToChat = (message) => {
    // Send the message to Twitch chat
    client.send('Twitch.ChatMessage', { message });

    // Send the message to YouTube chat
    client.send('YouTube.ChatMessage', { message });
};

export { client, sendMessageToChat };
