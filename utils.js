// utils.js
import 'dotenv/config';
// Function to conditionally log messages based on DEBUG_MODE
const debugLog = (message) => {
    if (process.env.DEBUG_MODE === 'true') {
        console.log(message);  // Only log if debug mode is enabled
    }
};

export { debugLog };
