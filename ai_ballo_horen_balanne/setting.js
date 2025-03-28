const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")

cmd({
    pattern: "settings",
    alias: ["setting"],
    desc: "settings the bot",
    category: "owner",
    react: "⚙",
    filename: __filename


},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        let desc = `*𝐒ᴜʟᴀ-𝐌ᴅ  𝐒ᴇᴛᴛɪɴɢꜱ......⚙️*


╭══════════════════════○
┣━ (01) *𝐖ᴏʀᴋ 𝐌ᴏᴅᴇ....🧠👁️*
> 1.1  Public Work__🫂
> 1.2  Private Work__❗
> 1.3  Group Only__👥
> 1.4  Inbox Only__👤
╭══════════════════════○
┣━ (02) *𝐀ᴜᴛᴏ 𝐕ᴏɪᴄᴇ.....🧠👁️*
> 2.1 Auto Voice __true 🔛
> 2.2 Auto Voice_ false 📴
╭══════════════════════○
┣━ (03) *𝐀ᴜᴛᴏ 𝐒ᴛᴀᴛᴜꜱ 𝐒ᴇᴇɴ.....🧠👁️*
> 3.1 Auto Read Status __true 🔛
> 3.2 Auto Read Status_ false 📴
╭══════════════════════○
┣━ (04) *𝐀ᴜᴛᴏ 𝐒ᴛɪᴄᴋᴇʀ....🧠👁️*
> 4.1 Auto sticker __true 🔛
> 4.2 Auto sticker_ false 📴
╭══════════════════════○
┣━ (05) *𝐀ᴜᴛᴏ 𝐑ᴇᴘʟʏ.....🧠👁️*
> 5.1 Auto reply __true 🔛
> 5.2 Auto reply_ false 📴
╭══════════════════════○
┣━ (06) *𝐁ᴏᴛ 𝐎ɴʟɪɴᴇ / 𝐎ꜰꜰʟɪɴᴇ....🧠👁️*
> 6.1 Online __true 🔛
> 6.2 Online_ false 📴
╭══════════════════════○
┣━ (07) *𝐌ꜱɢ 𝐑ᴇᴀᴅ....🧠👁️*
> 7.1 Read Msg __true 🔛
> 7.2 Read Msg_ false 📴
╭══════════════════════○
┣━  (08) *𝐌ꜱɢ 𝐑ᴇᴀᴄᴛ....🧠👁️*
> 8.1 Auto React __true 🔛
> 8.2 Auto React _ false 📴
╭══════════════════════○
┣━ (09) *𝐀ɴᴛɪ 𝐋ɪɴᴋ.....🧠👁️*
> 9.1 Anti Link__true 🔛
> 9.2 Anti Link _ false 📴
> 9.3 Anti Link + Remove ⛔
╭══════════════════════○
┣━ (10) *𝐀ᴜᴛᴏ 𝐒ᴛᴀᴛᴜꜱ 𝐑ᴇᴀᴄᴛ & 𝐑ᴇᴘʟʏ.....🧠👁️*
> 10. 1 Status React__true 🔛
> 10. 2 Status React _ false 📴
> 10. 3 Status Reply__true 🔛
> 10. 4 Status Reply _ false 📴
╭══════════════════════○

𝐀ᴜᴛᴏ 𝐒ᴛᴀᴛᴜꜱ 𝐑ᴘʟ එක වෙනස් කරන්න මෙහෙම කරන්න.....👇
 
.update 𝐀ᴜᴛᴏ_𝐒ᴛᴀᴛᴜꜱ_𝐌ꜱɢ: ඔයාට ඕන 𝐌ᴀɢ එක දාන්න......¿
╰══════════════════════○


🔢 𝐑ᴇᴘʟʏ 𝐁ᴇʟᴏᴡ 𝐓ʜɪꜱ 𝐍ᴜᴍʙᴇʀ 𝐂ʜᴀɴɢᴇ 𝐓ᴏ 𝐒ᴜʟᴀ -- 𝐌ᴅ 𝐁ᴏᴛ 𝐂ʜᴀɴɢᴇ 𝐒ᴇᴛᴛɪɴɢ.....❍

> 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐒ᴜʟᴀ_𝐌ᴅ......👁️❗`;

        const vv = await conn.sendMessage(from, { image: { url: "https://i.ibb.co/TB140kXn/SulaMd.png"}, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1.1':
                        reply(".update MODE:public" );
                        break;
                    case '1.2':               
                        reply(".update MODE:private");
                        break;
                    case '1.3':               
                          reply(".update MODE:group");
                      break;
                    case '1.4':     
                        reply(".update MODE:inbox");
                      break;
                    case '2.1':     
                        reply(".update AUTO_VOICE:true");
                        break;
                    case '2.2':     
                        reply(".update AUTO_VOICE:false");
                    break;
                    case '3.1':    
                        reply(".update AUTO_READ_STATUS:true");
                    break;
                    case '3.2':    
                        reply(".update AUTO_READ_STATUS:false");
                    break;                    
                    case '4.1':    
                        reply(".update AUTO_STICKER:true");
                    break;
                    case '4.2':    
                        reply(".update AUTO_STICKER:false");
                    break;                                        
                    case '5.1':    
                        reply(".update AUTO_REPLY:true");
                    break;
                    case '5.2':    
                        reply(".update AUTO_REPLY:false");
                    break;                        
                    case '6.1':    
                        reply(".update ALLWAYS_OFFLINE:true");
                    break; 
                    case '6.2':    
                        reply(".update ALLWAYS_OFFLINE:false");
                    break;                       
                    case '7.1':    
                        reply(".update READ_MESSAGE:true");
                    break;
                    case '7.2':    
                        reply(".update READ_MESSAGE:false");
                    break;
                    case '8.1':    
                        reply(".update AUTO_REACT:true");
                    break;
                    case '8.2':    
                        reply(".update AUTO_REACT:false");
                    break;
                    case '9.1':    
                        reply(".update ANTI_LINK:true");
                    break;
                    case '9.2':   
                        reply(".update ANTI_LINK:false");
                    break;
                    case '9.3':    
                        reply(".update ANTI_LINK:false");
                        reply(".update ANTI_LINKK:false");
                    break;
                    case '10.1':
                        reply(".update AUTO_REACT_STATUS:true");
                    break;
                    case '10.2':
                        reply(".update AUTO_REACT_STATUS:fales");
                    break;
                    case '10.3':
                        reply(".update AUTO_STATUS_REPLY:true");
                    break;
                    case '10.4':
                        reply(".update AUTO_STATUS_REPLY:fales");
                    break;
                    case '11.1':
                        reply(".ANTI_BAD:true");
                    break;
                     case '11.2':
                        reply(".ANTI_BAD:fales");
                    break;

                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
