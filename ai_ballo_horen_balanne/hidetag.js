const { cmd ,commands } = require('../command');
const { exec } = require('child_process');
const config = require('../config');
const {sleep} = require('../lib/functions')

cmd({
    pattern: "hidetag",
    fromMe: true,  // Only bot owner can use this command
    desc: "Send a message with hidden tags to all group members.",
    category: "group",
    react: "🔍",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, args, q, participants, reply }) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) {
            return await reply("❌ This command can only be used in a group.");
        }
        // Check if a message is provided
        if (!q) {
            return await reply("❗ Please provide a message to send.");
        }
        // Extract group participants' contact IDs
        const participantIds = participants.map((participant) => participant.id);
        // Send the message with hidden tags
        await conn.sendMessage(from, { 
            text: q, 
            mentions: participantIds 
        });
        console.log("Hidetag message sent to all group members.");
    } catch (e) {
        console.error("Error while sending hidetag message:", e);
        await reply("❗ An error occurred while trying to send the hidetag message.");
    }
});
