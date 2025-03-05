const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
cmd({
    pattern: "system",
    alias: ["status","botinfo"],
    desc: "Check up time , ram usage and more",
    category: "main",
    react: "💻",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `╭━━〔 *𝐒𝐔𝐋𝐀-𝐌𝐃* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *⏳Uptime*: ${runtime(process.uptime())}
┃◈┃• *📟 Ram*: 66.46MB / 63276.48MB
┃◈┃• *⚙️ Platform:-* ${os.hostname()}
┃◈┃• *👨‍💻 Owner*: Sulaksha Madara 
┃◈└───────────┈⊷
╰──────────────┈⊷


> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀_𝐌𝐃 😈
`
return reply(`${status}`)
  
}catch(e){
console.log(e)
reply(`${e}`)

}
})
