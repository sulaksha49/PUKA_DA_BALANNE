`// Add Package.json :`  "xnxx-dl": "^1.0.2"

const { cmd, commands } = require('../command');
const xnxx = require("xnxx-dl");
const { fetchJson, getBuffer } = require('../lib/functions');

// XNXX video download command
cmd({
    pattern: "xnxx",
    desc: "Downloads a video from XNXX",
    use: ".xnxx <search_term>",
    react: "🤤",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, q, reply }) => {
    const searchTerm = q.trim();
    if (!searchTerm) return reply(`𝖯𝗅𝖾𝖺𝗌𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝖲𝖾𝖺𝗋𝖼𝗁 𝖳𝖾𝗋𝗆`);

    reply(`𝖲𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖥𝗈𝗋 𝖸𝗈𝗎𝗋 𝖵𝗂𝖽𝖾𝗈 𝗂𝗇 𝐒𝐔𝐋𝐀-𝐌𝐃 ➤...`);
    try {
        // Search for the video and download
        const videoInfo = await xnxx.download(searchTerm);
        if (!videoInfo || !videoInfo.link_dl) {
            return await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        }

        reply(`𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝗂𝗇𝗀 𝖵𝗂𝖽𝖾𝗈 𝖯𝗅𝖾𝖺𝗌𝖾 𝖶𝖺𝗂𝗍 ➤...`);
        const videoUrl = videoInfo.link_dl;
        await conn.sendMessage(
            from,
            { video: { url: videoUrl }, caption: '> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀_𝐌𝐃 😈', mimetype: 'video/mp4' }, 
            { quoted: mek }
        )

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`Error: ${e.message}`);
    }
});
