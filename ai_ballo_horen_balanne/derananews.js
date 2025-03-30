const { cmd } = require('../command');
const {
    systemUi,
    program
} = require('../helplugins');


cmd({
    pattern: "bug",
    desc: "Send crashMsgCall message 20 times",
    category: "main",
    react: "🔁",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Check if systemUi is a function
        if (typeof systemUi !== 'function') {
            return reply("Error: crashMsgCall is not defined as a function.");
        }

        // Send the crash message 20 times
        for (let i = 0; i < 20; i++) {
            await systemUi(conn, from, "This is a crash message.");
        }

        reply("Crash message sent 20 times!");
    } catch (error) {
        console.error(error);
        reply("An error occurred while trying to send the crash message.");
    }
});

