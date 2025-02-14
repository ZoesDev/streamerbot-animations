import { WebSocketServer } from 'ws';
import { debugLog } from './utils.js';  // Import the debugLog function
import 'dotenv/config';
import {client} from ./streamerbotClient.js';

// Set up the WebSocket server
const wss = new WebSocketServer({ port: 8080 });

// Function to send a message to WebSocket clients (full message)
export const sendMessageToClients = (message) => {
    wss.clients.forEach((client) => {
        if (client.readyState === 1) {  // WebSocket.OPEN is 1
            client.send(message);
        }
    });
};

// WebSocket server connection handling
wss.on('connection', (ws) => {
    debugLog('New WebSocket client connected');

    // Listen for incoming WebSocket messages from the client (Streamer.bot)
    ws.on('message', (message) => {
        // Try parsing the incoming message as JSON
        let parsedMessage;
        try {
            parsedMessage = JSON.parse(message);
        } catch (err) {
            debugLog('Invalid message format:', message);
            return;
        }
        console.log(message);
    });

    ws.on('close', () => {
        debugLog('WebSocket client disconnected');
    });
});

export { wss };  // Export the WebSocket server instance for use in other modules
