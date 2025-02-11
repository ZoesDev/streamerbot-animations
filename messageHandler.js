import { debugLog } from './utils.js';  // Import the debugLog function
import { wss,sendMessageToClients } from './websocketServer.js';  // Import WebSocket server instance
import 'dotenv/config';


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


    sendMessageToClients(messageText);  // Send the full message (not filtered)
    debugLog(`Message received: ${messageText}`);
};

export {handleMessage };  // Export disableAnimations and handleMessage for use elsewhere
