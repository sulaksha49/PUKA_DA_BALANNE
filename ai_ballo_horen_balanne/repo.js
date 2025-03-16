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
        const timee = moment().tz('Asia/Colombo').format('HH:mm:ss');
        const channel = '𝐒𝐔𝐋𝐀-𝐌𝐃';
        const repolink = `https://github.com/sulakshamadara68/SULA-MD`;

        return await conn.sendMessage(from, { 
            image: { url: "https://i.ibb.co/WY2qBYz/SulaMd.jpg" },
            caption: repolink,contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363385281017920@newsletter',
                    newsletterName: '𝐒𝐔𝐋𝐀-𝐌𝐃',
                    serverMessageId: 190
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
