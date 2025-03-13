const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "mp3",
    desc: "Download YouTube audio as MP3",
    category: "download",
    use: ".mp3 <YouTube URL>",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a YouTube URL!");

        const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.result) {
            const { title, thumbnail, duration, views, channel, uploadDate, url: mp3Url } = response.data.result;

            let caption = `*🎵 YOUTUBE MP3 DOWNLOADER 🎵*\n\n` +
                          `🎶 *Title:* ${title}\n` +
                          `📺 *Channel:* ${channel}\n` +
                          `🕒 *Duration:* ${duration}\n` +
                          `📅 *Uploaded:* ${uploadDate}\n` +
                          `👁 *Views:* ${views}\n\n` +
                          `🎧 *Your MP3 is being processed...*\n` +
                          `|| 01 || *MP3 FORMAT* 🎶\n` +
                          `|| 02 || *DOCUMENT FORMAT* 📄\n` +
                          `|| 03 || *NORMAL DOWNLOAD* 🗂️`;

            const sentMsg = await conn.sendMessage(from, {
                image: { url: thumbnail },
                caption: caption
            }, { quoted: mek });

            const searchMessageId = sentMsg.key.id;

            const handleFormatSelection = async (messageUpdate) => {
                const message = messageUpdate.messages[0];
                if (!message.message || !message.message.extendedTextMessage) return;

                const isReplyToSearch = message.message.extendedTextMessage.contextInfo.stanzaId === searchMessageId;
                if (!isReplyToSearch) return;

                const selectedText = message.message.conversation || message.message.extendedTextMessage.text.trim();

                await conn.sendMessage(from, { react: { text: "🎵", key: message.key } });

                switch (selectedText) {
                    case '01': // MP3 format
                        await conn.sendMessage(from, {
                            audio: { url: mp3Url },
                            mimetype: "audio/mp3",
                            ptt: false
                        }, { quoted: mek });
                        break;

                    case '02': // Document format
                        await conn.sendMessage(from, {
                            document: { url: mp3Url },
                            mimetype: "application/pdf",
                            caption: `*🎵 Downloading as Document:* ${title}`
                        }, { quoted: mek });
                        break;

                    case '03': // Normal download
                        await conn.sendMessage(from, {
                            text: `*📂 Normal Download Link:*\n${mp3Url}`
                        }, { quoted: mek });
                        break;

                    default:
                        reply("❌ Invalid option selected.");
                }
            };

            conn.on('message-update', handleFormatSelection);

        } else {
            reply("❌ Failed to get MP3 link!");
        }
    } catch (error) {
        console.error(error);
        reply("❌ Error processing your request.");
    }
});
