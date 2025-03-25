const config = require('../config');
const { cmd } = require('../command');
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js');  

// play

const apikey = '02b7adf6c63ecb12' // https://api-dark-shan-yt.koyeb.app/signup
cmd({
    pattern: "ytmp3",
    alias: ["mp3"],
    use: ".ytmp3 <YouTube URL>",
    react: "🎶",
    desc: "Download YouTube audio in MP3 format",
    category: "download",
    filename: __filename
},
    async (conn, m, mek, { from, q, reply, prefix, tr }) => {
        try {
            if (!q) return await reply("*Please provide a valid YouTube URL!*");

            const apiUrl = `https://api-dark-shan-yt.koyeb.app/download/ytmp3?url=${encodeURIComponent(q)}&apikey=${apikey}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (!data.status || !data.data?.result) {
                return await reply("*Failed to fetch the audio. Please try again!*");
            }

            const { title, uploader, duration, quality, format, thumbnail, download } = data.data.result;

            const caption = `*🎶 YouTube MP3 Downloader 🎶*\n\n`
                + `> 📃 *Title:* ${title}\n`
                + `> 🎤 *Uploader:* ${uploader}\n`
                + `> ⌚ *Duration:* ${duration}\n`
                + `> 🎧 *Quality:* ${quality}kbps\n`
                + `> 🔉 *Format* ${format}\n\n`
                
                + `> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀_𝐌𝐃 😈`;

            // Send song details with image
            await conn.sendMessage(from, {
                image: { url: thumbnail },
                caption: caption
            }, { quoted: mek });

            // Send the audio file
            await conn.sendMessage(from, {
                audio: { url: download },
                mimetype: "audio/mpeg",
                fileName: `${title}.mp3`
            }, { quoted: mek });

        } catch (e) {
            console.error(e);
            await reply("*Error occurred while processing the request!*");
        }
    });
