import { wss } from './websocketServer.js';
import { client } from './streamerbotClient.js';
import { handleMessage } from './messageHandler.js';
import 'dotenv/config';
// Listen for Twitch messages
client.on('Twitch.ChatMessage', ({ data }) => {
    handleMessage(data);  // Handle message for Twitch
});

// Listen for YouTube messages
client.on('YouTube.Message', ({ data }) => {
    handleMessage(data);  // Handle message for YouTube
});

console.log('WebSocket server is running on ws://localhost:8080');
