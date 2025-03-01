const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const os = require('os');
const path = require('path');
const {cmd , commands} = require('../command');

cmd({
    pattern: "tourl",
    alias: ["imgurl","img2url"],
    react: '♻',
    desc: "Download anime maid images.",
    category: "anime",
    use: '.maid',
    filename: __filename
},
async(conn, mek, m, {from, mnu, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
 
try{

  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) throw `_\`img එකකට රිප්ලයි කරාපිය🔷\`_`;
 // if (!args[0]) throw ` \`\`\`[ 🌺 ] Ingresa un texto para guardar la imagen. Ejemplo:\n${usedPrefix + command} Sylph\`\`\``

  let media = await q.download();
  let tempFilePath = path.join(os.tmpdir(), 'sahastech');
  fs.writeFileSync(tempFilePath, media);

  let form = new FormData();
  form.append('image', fs.createReadStream(tempFilePath));

    let response = await axios.post('https://api.imgbb.com/1/upload?key=02b01525bdac411947ab8d1e2cd90a68', form, {
      headers: {
        ...form.getHeaders()
      }
    });

    if (!response.data || !response.data.data || !response.data.data.url) throw '❌ Error al subir el archivo';
    
    let link = response.data.data.url;
    fs.unlinkSync(tempFilePath);

    m.reply(`⛣ *file size* ${media.length} Byte(s)\n⛣ *𝚒𝚖𝚐 𝚞𝚛𝚕* ${link}\n\n> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜱᴀʜᴀꜱ ᴛᴇᴄʜ*`);
    
} catch (e) {
reply(`${e}`)
console.log(e)
}
})