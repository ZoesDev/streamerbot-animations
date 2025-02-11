// streamerbotClient.js
import { StreamerbotClient } from '@streamerbot/client';
import { debugLog } from './utils.js';  // We'll import the debugLog function
import 'dotenv/config';

// Create a new client with Streamer.bot
const client = new StreamerbotClient({
    host: process.env.streamerbotHost,
    port: process.env.streamerbotPort,
    autoReconnect: true,
    immediate: true,
    retries: -1,
});

//enable or disable
client.on('Command.Triggered', (event) => {
    console.log('Received event:', event.data.command);

    // waiting for command
    if (event.data.command === '!Animations disable') {
      console.log('Animations disable');
      // Trigger something based on the event
    }
    if (event.data.command === '!Animations enable') {
        console.log('animations enabled');
        // Trigger something based on the event
      }
    if (event.data.command === '!Animations status') {
    console.log('animations status');
    // Trigger something based on the event
    }
});




export { client };
