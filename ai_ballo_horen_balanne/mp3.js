const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
const yts = require('yt-search');
const domain = `https://manu-ofc-api-site-6bfcbe0e18f6.herokuapp.com`;
const api_key = `Manul-Ofc-Song-Dl-Key-9`;


cmd({
    pattern: "song",
    alias: ["audio"],
    desc: 'Download Song / Video',
    use: '.play Title',
    react: "🎧",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply('𝗣𝗹𝗲𝗮𝘀𝗲 𝗣𝗿𝗼𝘃𝗶𝗱𝗲 𝗮 𝗦𝗼𝗻𝗴 𝗧𝗶𝘁𝗹𝗲 ❗.');
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
> *🎧CHALAH MD  𝗔𝗨𝗗𝗜𝗢🎧*
╭──────────────────────

> *☘️ ➢| ᴛɪᴛʟᴇ  :* *${data.title}*

> *👀 ➢| ᴠɪᴇᴡꜱ  :* *${data.views}*

> *⛔ ➢| ᴅᴇꜱᴄʀɪᴘᴛɪᴏᴍ  :* *${data.description}*

> *⏰ ➢| ᴛɪᴍᴇ  :* *${data.timestamp}* 

> *📅 ➢| ᴀɢᴏ  :* *${data.ago}*
*╰────────────────────*
*🔢𝘙𝘌𝘗𝘓𝘠 𝘛𝘏𝘌 𝘛𝘏𝘈𝘛𝘚 𝘠𝘖𝘜 𝘞𝘈𝘕𝘛 𝘕𝘜𝘔𝘉𝘌𝘙*

|| 01.||  𝗔𝘂𝗱𝗶𝗼 🎧
|| 02.|| 𝗗𝗼𝗰𝘂𝗺𝗲𝗻𝘁 📂

> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀_𝐌𝐃 😈`;

        const vv = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
    const response = await fetchJson(`${domain}/api/ytmp3?videoUrl=${data.url}&apikey=${api_key}`);
    
    const downloadUrl = response.data.dl_link;

//============Send Audio======================
await conn.sendMessage(from,{audio:{url: downloadUrl },mimetype:"audio/mpeg",caption :"> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀_𝐌𝐃 😈"},{quoted:mek})
                        break;
       
                    case '2':               
const responsex = await fetchJson(`${domain}/api/ytmp3?videoUrl=${data.url}&apikey=${api_key}`);
    
    const downloadUrlx = responsex.data.dl_link;

//=============Send Document=================
await conn.sendMessage(from,{document:{url: downloadUrlx },mimetype:"audio/mpeg",fileName: data.title + ".mp3" ,caption :"> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀_𝐌𝐃 😈"},{quoted:mek})
                        break;
 
                    default:
                        reply("Invalid option. Please select a valid option 💗");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
