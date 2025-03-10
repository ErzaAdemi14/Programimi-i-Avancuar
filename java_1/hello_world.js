// Import required modules
import readline from 'readline/promises';

/**
 * Prompt user for their name with error handling
 * @returns {Promise<string>} Valid user name
 */
async function getUserName() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let name;
    do {
        try {
            name = await rl.question('Please enter your name: ');
            name = name.trim();
            if (!name) {
                console.log('Name cannot be empty. Please try again.');
            }
        } catch (err) {
            console.error('Error reading input:', err);
            process.exit(1);
        }
    } while (!name);

    rl.close();
    return name;
}

/**
 * Display personalized greeting with current timestamp
 * @param {string} name User's name
 */
function displayGreeting(name) {
    try {
        const now = new Date();
        const formattedDate = now.toLocaleString(); // Localized date/time format
        console.log(`\nHello, ${name}!`);
        console.log(`Current date and time: ${formattedDate}`);
    } catch (err) {
        console.error('Error displaying greeting:', err);
    }
}

// Main execution
(async () => {
    console.log('Hello, World!'); // Initial required output
    const userName = await getUserName();
    displayGreeting(userName);
})();