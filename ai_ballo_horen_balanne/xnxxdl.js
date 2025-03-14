const axios = require('axios');
const cheerio = require('cheerio'); // Import cheerio for HTML pa

cmd({
    pattern: "xvideo",
    alias: ["xvideo2"],
    react: "🎥",
    desc: "download",
    category: "download",
    filename: __filename
}, async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) return reply("*⚠️ Please provide a video title or URL*\n\n*Example:* .xvideo My MILF Secretary Love");

        const query = String(q);
        let results;
        let videoData;

        if (q.includes('xnxx.com')) {
            videoData = await xnxxdl(q);
            if (!videoData.status) {
                return reply("❌ Failed to fetch video data!");
            }
            results = {
                title: videoData.result.title,
                duration: videoData.result.duration,
                thumb: videoData.result.image,
                quality: 'HD',
                url: q
            };
        } else {
            const searchResult = await xnxxsearch(query);
            if (!searchResult.status || !searchResult.result.length) {
                return reply("❌ No results found! Please try another search.");
            }
            const firstResult = searchResult.result[0];
            videoData = await xnxxdl(firstResult.link);
            results = {
                title: firstResult.title,
                duration: videoData.result.duration,
                thumb: videoData.result.image,
                quality: 'HD',
                url: firstResult.link
            };
        }

        let desc = `🎥 *𝐒𝐔𝐋𝐀-𝐌𝐃 Downloading:* ${results.title}

⏱️ *Duration:* ${results.duration}
👁️ *Views:* ${results.views || 'N/A'}
📅 *Quality:* ${results.quality || 'N/A'}

⏳ *Please wait, processing your request...*`;

        if (config.BUTTON === 'true') {
            await conn.sendMessage(from, {
                image: { url: results.thumb },
                caption: desc,
                footer: "© 2025 Didula MD",
                buttons: [{
                    buttonId: `.download ${results.url}`,
                    buttonText: { displayText: 'Download Video 📥' },
                    type: 1
                }],
                headerType: 1,
                contextInfo: {
                    isForwarded: true,
                    mentionedJid: [m.sender],
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363385281017920@newsletter",
                        newsletterName: "𝐒𝐔𝐋𝐀-𝐌𝐃"
                    }
                }
            }, { quoted: qtoko });
        } else {
            await conn.sendMessage(from, {
                image: { url: results.thumb },
                caption: desc
            }, { quoted: qtoko });
        }

        try {
            const videoUrl = videoData.result.files.high || videoData.result.files.low;
            if (!videoUrl) throw new Error("No download URL found");

            await conn.sendMessage(from, {
                video: { url: videoUrl },
                mimetype: "video/mp4",
                caption: "> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀_𝐌𝐃 😈"
            }, { quoted: qtoko });

        } catch (error) {
            reply("❌ Error downloading video: " + error.message);
        }

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});
