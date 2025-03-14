const config = require('../config');
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js'); 
const fetch = require('node-fetch');

module.exports = async (conn, mek, m) => { 
    try {
        let text = m.body || '';
        if (!text) return;

        // Regex to detect YouTube URLs
        const ytRegex = /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        
        // If text contains a YouTube URL or is a song request (simple heuristic)
        if (ytRegex.test(text) || text.toLowerCase().includes('song')) {  
            await conn.sendMessage(m.chat, { text: "🔍 Searching for the song, please wait..." }, { quoted: mek });

            const yt = await ytsearch(text);
            if (yt.results.length < 1) return conn.sendMessage(m.chat, { text: "❌ No results found!" }, { quoted: mek });

            let yts = yt.results[0];  
            let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;

            let response = await fetch(apiUrl);
            let data = await response.json();

            if (data.status !== 200 || !data.success || !data.result.download_url) {
                return conn.sendMessage(m.chat, { text: "⚠️ Failed to fetch the video. Try again later!" }, { quoted: mek });
            }

            let ytmsg = `╭━━〔 *🎵 Now Playing 🎵* 〕━━
┇🎶 *Title* -  ${yts.title}
┇⏳ *Duration* - ${yts.timestamp}
┇👁 *Views* -  ${yts.views}
┇📝 *Author* -  ${yts.author.name}
┇🔗 *Link* -  ${yts.url}
╰━━━━━━━━━━━━━

> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀_𝐌𝐃 😈`;

            await conn.sendMessage(m.chat, { image: { url: data.result.thumbnail || '' }, caption: ytmsg }, { quoted: mek });

            await conn.sendMessage(m.chat, { 
                audio: { url: data.result.download_url }, 
                mimetype: "audio/mp3", 
                fileName: `${yts.title}.mp3`,
                caption: `🎶 *${yts.title}*`
            }, { quoted: mek });
        }
    } catch (e) {
        console.log(e);
        conn.sendMessage(m.chat, { text: "❌ An error occurred. Try again later!" }, { quoted: mek });
    }
};
