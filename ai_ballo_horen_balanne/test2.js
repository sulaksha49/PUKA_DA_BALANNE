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
        const message = `🔐 *Your Strong Password* 🔐\n\nPlease find your generated password below:\n\n> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀-𝐌𝐃 😈`;

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
    pattern: "removebg",
    alias: ["rbg", "bgremove"],
    react: '🖇',
    desc: "Remove the background from an image.",
    category: "other",
    use: '.removebg',
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, args, reply
}) => {

    try {
        // Check if the message has quoted an image
        let q = m.quoted ? m.quoted : m;
        let mime = q.msg?.mimetype || "";
        if (!mime || !mime.startsWith('image/')) {
            throw '🌻 Please reply to an image.';
        }

        // Download the quoted image
        let media = await q.download();
        if (!media) throw 'Failed to download the image. Please try again.';

        // Save the image temporarily
        const fs = require('fs');
        const path = require('path');
        const FormData = require('form-data');
        const axios = require('axios');
        const os = require('os');

        let tempFilePath = path.join(os.tmpdir(), 'ManulOfcX.png'); // Add file extension
        fs.writeFileSync(tempFilePath, media);

        // Prepare the image for upload to imgbb
        let form = new FormData();
        form.append('image', fs.createReadStream(tempFilePath));

        let response = await axios.post(
            'https://api.imgbb.com/1/upload?key=06d00f0e4520243a32b58138765a2ecc', 
            form, {
                headers: {
                    ...form.getHeaders()
                }
            }
        );

        if (!response.data || !response.data.data.url) {
            fs.unlinkSync(tempFilePath); // Clean up the temporary file
            throw '❌ Error uploading the file. Please try again.';
        }

        // Get the image URL from imgbb
        let link = response.data.data.url;

        // Prepare the Remove BG API URL
        let rbgUrl = `https://api.nexoracle.com/image-processing/remove-bg?apikey=RDB9bTxrjAf71NFHd&img=${link}`;
        let desc = `> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀-𝐌𝐃 😈`;

        // Send the processed image to the chat
        await conn.sendMessage(from, { image: { url: rbgUrl }, caption: desc }, { quoted: mek });

        // Clean up the temporary file
        fs.unlinkSync(tempFilePath);

    } catch (e) {
        // Handle errors gracefully
        console.error(e);
        reply(`❌ An error occurred: ${e.message || e}`);
    }
});




cmd({
    pattern: "toimg",
    alias: ["sticker2img", "s2img"],
    react: "🖼",
    desc: "Convert a sticker to an image.",
    category: "utility",
    use: ".toimg",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, reply
}) => {
    try {
        const fs = require("fs");
        const path = require("path");
        const os = require("os");

        // Check if the quoted message contains a sticker
        let q = m.quoted ? m.quoted : m;
        let mime = q.msg?.mimetype || "";
        if (!mime || !mime.startsWith("image/") && !mime.startsWith("video/")) {
            throw "🌻 Please reply to a sticker.";
        }

        // Download the sticker
        let media = await q.download();
        if (!media) throw "Failed to download the sticker. Please try again.";

        // Save the sticker temporarily as .jpg
        const tempStickerPath = path.join(os.tmpdir(), "sticker.jpg");

        fs.writeFileSync(tempStickerPath, media);

        // Send the converted image to the user
        await conn.sendMessage(
            from,
            { image: fs.readFileSync(tempStickerPath), caption: "🌟 Here is your image!" },
            { quoted: mek }
        );

        // Clean up the temporary file
        fs.unlinkSync(tempStickerPath);

    } catch (e) {
        // Handle errors gracefully
        console.error(e);
        reply(`❌ An error occurred: ${e.message || e}`);
    }
});
