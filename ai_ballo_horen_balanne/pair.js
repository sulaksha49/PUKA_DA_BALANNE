const { cmd } = require("../command");

cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
    desc: "Pairing code",
    category: "download",
    use: ".pair +9476066XXXX",
    filename: __filename
}, 
async (conn, mek, m, { from, prefix, quoted, q, reply }) => {
    try {
        // Helper function for delay
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        // Validate input
        if (!q) {
            return await reply("*Example -* .pair +9476066XXXX");
        }

        // Fetch pairing code
        const response = await fetch(`https://sula-pair-web.onrender.com/code?number=${q}`);
        const pair = await response.json();

        // Check for errors in response
        if (!pair || !pair.code) {
            return await reply("Failed to retrieve pairing code. Please check the phone number and try again.");
        }

        // Success response
        const pairingCode = pair.code; // Corrected this line
        const doneMessage = "> *𝐒𝐔𝐋𝐀-𝐌𝐃 PAIR COMPLETED*";

        // Send first message
        await reply(`${doneMessage}\n\n*Your pairing code is:* ${pairingCode}`);

        
        await sleep(2000);

        await reply(`Code: ${pairingCode}`);
    } catch (error) {
        console.error(error);
        await reply("An error occurred. Please try again later.");
    }
});
