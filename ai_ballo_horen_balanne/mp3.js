/*

Plugin Author: *Dark-Yasiya*
Follow Us: *https://whatsapp.com/channel/0029VaaPfFK7Noa8nI8zGg27*

*/

```const config = require('../config');
const { cmd } = require('../command');
const DY_SCRAP = require('@dark-yasiya/scrap');
const dy_scrap = new DY_SCRAP();

function replaceYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

cmd({
    pattern: "song",
    alias: ["ytmp3", "ytmp3dl"],
    react: "🎵",
    desc: "Download Ytmp3",
    category: "download",
    use: ".song <Text or YT URL>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) {
            return await reply("❌ Please provide a Query or Youtube URL!");
        }

        let id = null;
        if (q.startsWith("https://")) {
            id = replaceYouTubeID(q);
        }

        if (!id) {
            const searchResults = await dy_scrap.ytsearch(q);
            if (!searchResults?.results?.length) return await reply("❌ No results found!");
            id = searchResults.results[0].videoId;
        }

        const response = await dy_scrap.ytmp3(`https://youtube.com/watch?v=${id}`);
        if (!response?.status) return await reply("❌ Failed to fetch video!");

        const { url, title, description, image, timestamp, ago, views, author } = response?.result?.data;

        let info = `🍄 *𝚂𝙾𝙽𝙶 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁* 🍄\n\n` +
            `🎵 *Title:* ${title || "Unknown"}\n` +
            `⏳ *Duration:* ${timestamp || "Unknown"}\n` +
            `👀 *Views:* ${views || "Unknown"}\n` +
            `🌏 *Release Ago:* ${ago || "Unknown"}\n` +
            `👤 *Author:* ${author?.name || "Unknown"}\n` +
            `🖇 *Url:* ${url || "Unknown"}\n\n` +
            `🔽 *Reply with your choice:*\n` +
            `1️⃣.1️⃣ *Audio Type* 🎵\n` +
            `1️⃣.2️⃣ *Document Type* 📁\n\n` +
            `${config.FOOTER || "> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀_𝐌𝐃 😈"}`;

        const sentMsg = await conn.sendMessage(from, { image: { url: image }, caption: info }, { quoted: mek });
        const messageID = sentMsg.key.id;
        await conn.sendMessage(from, { react: { text: '🎶', key: sentMsg.key } });

        // Listen for user reply
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mekInfo = messageUpdate?.messages[0];
            if (!mekInfo?.message) return;

            const messageType = mekInfo?.message?.conversation || mekInfo?.message?.extendedTextMessage?.text;
            const isReplyToSentMsg = mekInfo?.message?.extendedTextMessage?.contextInfo?.stanzaId === messageID;

            if (!isReplyToSentMsg) return;

            let userReply = messageType.trim();
            let videoUrl = response?.result?.download?.url;
            if (!videoUrl) return await reply("❌ Download link not found!");

            let msg;
            let type;
            if (userReply === "1.1") {
                msg = await conn.sendMessage(from, { text: "⏳ Processing..." }, { quoted: mek });
                type = { audio: { url: videoUrl }, mimetype: "audio/mpeg" };
            } else if (userReply === "1.2") {
                msg = await conn.sendMessage(from, { text: "⏳ Processing..." }, { quoted: mek });
                type = { document: { url: videoUrl }, fileName: `${title}.mp3`, mimetype: "audio/mpeg", caption: title };
            } else {
                return await reply("❌ Invalid choice! Reply with 1️⃣.1️⃣ or 1️⃣.2️⃣.");
            }

            // Send the selected file
            await conn.sendMessage(from, type, { quoted: mek });

            // Edit the message to indicate success
            await conn.sendMessage(from, { text: '✅ Media Upload Successful ✅', edit: msg.key });
        });

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        await reply(`❌ *An error occurred:* ${e.message || "Error!"}`);
    }
});
```
