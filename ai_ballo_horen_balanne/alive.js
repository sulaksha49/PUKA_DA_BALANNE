const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "👋",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate system status message
        const status = `╭━━〔 *𝐒𝐔𝐋𝐀-𝐌𝐃* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *👋Hi*: ${pushname}
┃◈┃• *⏳Uptime*:  ${runtime(process.uptime())} 
┃◈┃• *📟 Ram*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
┃◈┃• *👨‍💻 Owner*: Sulaksha Madara 
┃◈└───────────┈⊷
╰──────────────┈⊷

  *𝐒𝐮𝐥𝐚 𝐌𝐃 Multidevice Whatsapp Bot Make By (Sulaksha Madara).*

     ⭕𝗝𝗢𝗜𝗡 𝗢𝗨𝗥 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 𝗖𝗛𝗔𝗡𝗡𝗘𝗟
     
  https://whatsapp.com/channel/0029Vb65iOZKwqSNKecV8V07

     ⭕𝗝𝗢𝗜𝗡 𝗢𝗨𝗥 𝗦𝗨𝗣𝗣𝗢𝗥𝗧 𝗚𝗥𝗢𝗨𝗣
     
  https://chat.whatsapp.com/BA1G39lcm1iA0ECKrlk4OD
  
> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀_𝐌𝐃 😈`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://i.ibb.co/Y7X4ScqS/SulaMd.png` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363385281017920@newsletter',
                    newsletterName: '𝐒𝐔𝐋𝐀-𝐌𝐃',
                    serverMessageId: 190
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
