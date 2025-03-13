const config = require('../config');
const { cmd } = require('../command');
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js'); 

// video

cmd({ 
    pattern: "video", 
    alias: ["ytdl", "mp4"], 
    react: "🎥", 
    desc: "Download Youtube song", 
    category: "main", 
    use: '.song < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("Please provide a YouTube URL or song name.");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");
        
        let yts = yt.results[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.download_url) {
            return reply("Failed to fetch the video. Please try again later.");
        }
        
        let ytmsg = `╭━━━〔 *𝐒𝐔𝐋𝐀-𝐌𝐃* 〕━━━┈⊷
┇๏ *Title* -  ${yts.title}
┇๏ *Duration* - ${yts.timestamp}
┇๏ *Views* -  ${yts.views}
┇๏ *Author* -  ${yts.author.name}
┇๏ *Link* -  ${yts.url}
╰────────────────┈⊷

> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀_𝐌𝐃 😈`;

        // Send video details
        await conn.sendMessage(from, { image: { url: data.result.thumbnail || '' }, caption: ytmsg }, { quoted: mek });
        
        // Send video file
        await conn.sendMessage(from, { video: { url: data.result.download_url }, mimetype: "video/mp4" }, { quoted: mek });
        
        // Send document file (optional)
        await conn.sendMessage(from, { 
            document: { url: data.result.download_url }, 
            mimetype: "video/mp4", 
            fileName: `${data.result.title}.mp4`, 
            caption: `> *${yts.title}*\n> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀_𝐌𝐃 😈`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});  
       
// play
cmd({
  pattern: "song",
  alias: ["ytmp3", "yta"],
  react: "🎵",
  desc: "Download Youtube song",
  category: "download",
  use: ".song < Yt url or Name >",
  filename: __filename
}, async (bot, message, options, { from, prefix, quoted, q, reply }) => {
  try {
    if (!q) {
      return await reply("⚠️ Please provide a YouTube URL or song name!");
    }

    const searchResults = await yts(q);
    if (!searchResults.videos.length) {
      return reply("❌ No results found!");
    }

    const video = searchResults.videos[0];
    const response = await fetch(`https://velyn.vercel.app/api/downloader/ytmp3?url=${video.url}`);
    const data = await response.json();

    if (!data.status) {
      throw "Download failed";
    }

    let caption = `╭━━━〔 *𝐒𝐔𝐋𝐀-𝐌𝐃* 〕━━━┈⊷

╭━━❐━⪼
┇🎧 *Title:* ${video.title}
┇👀 *Views:* ${video.views}
┇👤 *Channel:* ${video.author.name}
┇📅 *Published:* ${video.ago}
╰━━❑━⪼

> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀_𝐌𝐃 😈`;

    await bot.sendMessage(from, {
      audio: {
        url: data.output
      },
      mimetype: "audio/mpeg",
      contextInfo: {
        externalAdReply: {
          title: video.title,
          body: video.author.name,
          thumbnail: {
            url: video.thumbnail
          },
          mediaType: 2,
          mediaUrl: video.url
        }
      }
    }, {
      quoted: quoted
    });
  } catch (error) {
    console.error(error);
    reply("❌ An error occurred while downloading. Please try again later.");
  }
});
