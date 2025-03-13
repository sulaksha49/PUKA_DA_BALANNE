cmd({
    pattern: "song",
    alias: ["ytmp3", "yta"],
    react: "🎵",
    desc: "Download Youtube song",
    category: "download",
    use: '.song < Yt url or Name >',
    filename: __filename
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => {
    try {
        if (!q) return await reply("⚠️ Please provide a YouTube URL or song name!");

        const videos = await yts(q);
        if (!videos.videos.length) return reply("❌ No results found!");

        const video = videos.videos[0];
        const response = await fetch(`https://apis.davidcyriltech.my.id/download/ytmp3?url=${video.url}`);
        const data = await response.json();

        if (!data.status) throw "Download failed";

        let ytmsg = `╭━━━〔 𝐒𝐔𝐋𝐀-𝐌𝐃 〕━━━┈⊷

╭━━❐━⪼
┇🎧 *Title:* ${video.title}
┇👀 *Views:* ${video.views}
┇👤 *Channel:* ${video.author.name}
┇📅 *Published:* ${video.ago}
╰━━❑━⪼

> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀_𝐌𝐃 😈`;

        await conn.sendMessage(from, {
            audio: { url: data.output },
            mimetype: "audio/mpeg",
            contextInfo: {
                externalAdReply: {
                    title: video.title,
                    body: video.author.name,
                    thumbnail: { url: video.thumbnail },
                    mediaType: 2,
                    mediaUrl: video.url
                }
            }
        }, { quoted: qtoko });

    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while downloading. Please try again later.");
    }
});
