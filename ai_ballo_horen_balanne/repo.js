const fetch = require('node-fetch');
const config = require('../config');    
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    desc: "get bot repo.",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, sender, pushname, reply }) => {
    try {
        const channel = 'SULA-MD';
        const repolink = `⭕ *𝐒𝐔𝐋𝐀-𝐌𝐃 Github Repository*

> https://github.com/SULA-MDV1/SULA-MD-V1

⭕ *𝐒𝐔𝐋𝐀-𝐌𝐃 DIPLOY HEROKU*

> https://dashboard.heroku.com/new-app?template=https://github.com/SULA-MDV1/SULA-MD-V1

⭕ *𝐒𝐔𝐋𝐀-𝐌𝐃 WEB*

> https://sula-lpgp.onrender.com

> https://sulamdweb-69ef41909ab5.herokuapp.com/

*⭕ WHATSAPP CHANNEL :*

> https://whatsapp.com/channel/0029Vb65iOZKwqSNKecV8V07

*⭕Contact Owner :*

> wa.me/94760663483`;

        return await conn.sendMessage(from, { 
            image: { url: "https://i.ibb.co/WY2qBYz/SulaMd.jpg" },
            caption: repolink,contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363385281017920@newsletter',
                    newsletterName: '𝐒𝐔𝐋𝐀-𝐌𝐃',
                    serverMessageId: -1
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
