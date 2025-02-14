import { StreamerbotClient } from '@streamerbot/client';
import { debugLog } from './utils.js';
import 'dotenv/config';

// Create a new client with Streamer.bot
const client = new StreamerbotClient({
    host: process.env.streamerbotHost,
    port: process.env.streamerbotPort,
    autoReconnect: true,
    immediate: true,
    retries: -1,
});

// Object to store state
const animationState = {
    disabled: false
};

// Function to get the current state
export const isAnimationsDisabled = () => animationState.disabled;

// Function to update the state
export const setAnimationsDisabled = (value) => {
    animationState.disabled = value;
};

// Handle enable/disable commands
client.on('Command.Triggered', (event) => {
    const { command } = event.data;

    if (command === '!Animations disable') {
        if (animationState.disabled) {
            console.log('Animations already disabled');
        } else {
            console.log('Animations disabled');
            setAnimationsDisabled(true);
        }
    }

    if (command === '!Animations enable') {
        if (!animationState.disabled) {
            console.log('Animations already enabled');
        } else {
            console.log('Animations enabled');
            setAnimationsDisabled(false);
        }
    }

    if (command === '!Animations status') {
        console.log(`Animations status: ${animationState.disabled ? 'Disabled' : 'Enabled'}`);
    }
});

export { client };
