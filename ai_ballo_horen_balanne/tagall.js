const { cmd ,commands } = require('../command');
const { exec } = require('child_process');
const config = require('../config');
const {sleep} = require('../lib/functions')

cmd({
  pattern: "tagall",
  desc: "Tags all members and admins in the group.",
  category: "group",
  react: "🏷️",
  use: ".tagall",
  filename: __filename
}, async (conn, mek, m, { from, isGroup, groupMetadata, participants, isOwner, isAdmins, groupAdmins, reply }) => {
  try {
    if (!isGroup) {
      return reply("*This command can only be used in groups.⛱️*");
    }
        if (!isOwner && !isAdmins) {
      return reply("*This command can only be used by the bot owner.❗*");
    }
    if (!participants || participants.length === 0) {
      return reply("*There are no members in this group.🗣️*");
    }
    let tagMessage = "*Tagging All: 🏷️*\n\n";
    let mentions = [];

    for (let participant of participants) {
      const isAdmin = groupAdmins.includes(participant.id);
      tagMessage += `@${participant.id.split('@')[0]} ${isAdmin ? "(Admin 📍)" : ""}\n`;
      mentions.push(participant.id);
    }
    await conn.sendMessage(from, {
      text: tagMessage,
      mentions: mentions
    }, { quoted: mek });
  } catch (error) {
    console.error("Error tagging members and admins:", error);
    reply("An error occurred while trying to tag all members and admins. Please try again.");
  }
});


Hidetag Command
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
