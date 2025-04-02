const crypto = require('crypto');
const { cmd, commands } = require('../command');
 
const fetch = require('node-fetch');
const axios = require('axios');
const cheerio = require("cheerio");
const emailDataStore = {};
cmd({
    pattern: "gpass",
    desc: "Generate a strong password.",
    category: "other",
    react: "🔐",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const length = args[0] ? parseInt(args[0]) : 12; // Default length is 12 if not provided
        if (isNaN(length) || length < 8) {
            return await reply('Please provide a valid length for the password (minimum 8 characters).');
        }

        const generatePassword = (len) => {
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
            let password = '';
            for (let i = 0; i < len; i++) {
                const randomIndex = crypto.randomInt(0, charset.length);
                password += charset[randomIndex];
            }
            return password;
        };

        const password = generatePassword(length);
        const message = `🔐 *Your Strong Password* 🔐\n\nPlease find your generated password below:\n\n🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀-𝐌𝐃 😈`;

        // Send initial notification message
        await conn.sendMessage(from, { text: message }, { quoted: mek });

        // Send the password in a separate message
        await conn.sendMessage(from, { text: password }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`❌ Error generating password: ${e.message}`);
    }
});

cmd({
    pattern: "getdetails",
    alias: ["songname", "getsong"],
    react: "🎵",
    desc: "Get the song name from the audio or video file.",
    category: "utility",
    use: ".getname",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted,mnu, reply, handleFile
}) => {
    try {
        const fs = require("fs");
        const path = require("path");
        const os = require("os");

        // Check if the quoted message contains an audio or video file
        let q = m.quoted ? m.quoted : m;
        let mime = q.msg?.mimetype || "";
        
        if (!mime || (!mime.startsWith("audio/") && !mime.startsWith("video/"))) {
            throw "🌻 Please reply to an audio or video file.";
        }

        // Download the file (audio or video)
        let media = await q.download();
        if (!media) throw "Failed to download the media file. Please try again.";

        // Save the media file temporarily
        const tempFilePath = path.join(os.tmpdir(), "mediafile");

        fs.writeFileSync(tempFilePath, media);

        // Call the music recognition function
        const musicDataArray = await handleFile(tempFilePath);

        // Clean up the temporary audio file
        fs.unlinkSync(tempFilePath);

        // Check if we got any result from recognition
        if (!musicDataArray || musicDataArray.length === 0) {
            throw "🎶 Couldn't recognize the song. Please try with a valid audio or video file.";
        }

        // Extract music data from the first result
        const musicData = musicDataArray[0];

        // Prepare the song details to send with premium formatting
        const songName = `
✨ *QUEEN ANJU XPRO* 🎤

🎶 *Song Information:*
🔊 **Label**: ${musicData.label}
🎵 **Title**: ${musicData.title}
💿 **Album**: ${musicData.album.name || 'Unknown'}
📅 **Release Date**: ${musicData.release_date}
🎤 **Artist(s)**: ${musicData.artists.map(artist => artist.name).join(", ") || 'Unknown'}

🔮 *Enjoy the music experience with QUEEN ANJU XPRO!* 💎
`;

        // Send the recognized song details to the user
        await conn.sendMessage(
            from,
            { text: songName },
            { quoted: mnu }
        );

    } catch (e) {
        // Handle errors gracefully
        console.error(e);
        reply(`❌ *An error occurred:* ${e.message || e}`);
    }
});
