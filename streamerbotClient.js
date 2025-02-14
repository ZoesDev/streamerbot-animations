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

let disableAnimations = false;


//enable or disable
client.on('Command.Triggered', (event) => {
    // waiting for command
    if (event.data.command === '!Animations disable') {
      // Trigger something based on the event
        if (disableAnimations == true) {
            console.log('Animations already disabled');
        } else {
            console.log('Animations disabled');
            disableAnimations = true;
        }

    }
    if (event.data.command === '!Animations enable') {
        // Trigger something based on the event\
        if (disableAnimations == false) {
            console.log('Animations already enabled');
        } else {
            console.log('Animations enabled');
            disableAnimations = false;
        }
    }
    if (event.data.command === '!Animations status') {
    console.log('animations status');
    // Trigger something based on the event
    console.log(disableAnimations);
    }
});




export { client };
