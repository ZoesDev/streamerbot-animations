// messageHandler.js
import { debugLog } from './utils.js';  // We'll import the debugLog function
import { sendMessageToClients } from './websocketServer.js';  // Import WebSocket client handler
import 'dotenv/config';
// Flag to control whether animations are allowed or not
let disableAnimations = false;

// Combined message handler to process Twitch and YouTube chat
const handleMessage = (data) => {
    debugLog('Incoming message data:', data);

    // Add the platform field if not already present (for YouTube messages)
    if (!data.platform) {
        data.platform = data.user.type; // Use user.type to assign platform (e.g., 'twitch' or 'youtube')
    }

    let messageText = '';

    // Check if platform is Twitch
    if (data.platform === 'twitch') {
        debugLog('Twitch message detected');
        if (data.message && data.message.message) {
            messageText = data.message.message;
            debugLog(messageText);
        }
    } else if (data.platform === 'youtube') {
        debugLog('YouTube message detected');
        messageText = data.message || '';
        debugLog('YouTube messageText:', messageText);
    }

    if (!messageText) {
        debugLog('No valid messageText found');
        return;
    }

    if (
        (process.env.ignoredUsers && process.env.ignoredUsers.includes(data.username)) ||
        (process.env.ignoredIds && process.env.ignoredIds.includes(data.userId))
    ) {
        debugLog(`Message from ${data.username} ignored.`);
        return;  // Ignore the message
    }

    if (disableAnimations) {
        debugLog('Animations are currently disabled.');
        return;
    }

    sendMessageToClients(messageText);  // Send the full message (not filtered)
    debugLog(`Message received: ${messageText}`);

    // Handle animation enable/disable requests
    if (data.message === 'disableAnimations') {
        disableAnimations = true;
        debugLog('Animations have been disabled.');
    }

    if (data.message === 'enableAnimations') {
        disableAnimations = false;
        debugLog('Animations have been enabled.');
    }
};

export { handleMessage };
