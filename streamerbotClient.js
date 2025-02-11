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


export { client };
