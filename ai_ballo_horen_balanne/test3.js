const { cmd } = require('../command');
const fs = require('fs');
const fileType = require('file-type');
const axios = require('axios');
const FormData = require('form-data');

const REMOVE_BG_API_KEY = 'ApFQTmjGsYJ7WQWmNDbrGz4j';

cmd({
  pattern: 'removebg',
  react: '🔥',
  alias: ['rb'],
  category: 'convert',
  use: '.removebg <reply image>',
  filename: __filename
}, async (sock, message, m, { from, reply, quoted }) => {
  try {
    const isImage = quoted?.type === 'imageMessage' || (quoted?.type === 'viewOnceMessage' && quoted.msg.type === 'imageMessage');
    if (!(m.type === 'imageMessage' || isImage)) return reply('⚠️ Please reply to an image message.');

    const imageBuffer = isImage ? await quoted.download() : await m.download();
    const fileTypeData = await fileType.fromBuffer(imageBuffer);
    if (!fileTypeData || !['jpg', 'png'].includes(fileTypeData.ext)) return reply('⚠️ Only JPG or PNG images are supported!');

    const formData = new FormData();
    formData.append('image_file', imageBuffer, { filename: `temp.${fileTypeData.ext}` });
    formData.append('size', 'auto');

    const { data, status } = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
      headers: { 'X-Api-Key': REMOVE_BG_API_KEY, ...formData.getHeaders() },
      responseType: 'arraybuffer'
    });

    if (status !== 200) return reply('❌ Failed to remove background.');

    await sock.sendMessage(from, { image: data, caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴀᴋᴀ-ᴍᴅ' }, { quoted: message });
  } catch (error) {
    console.error('Error:', error);
    reply('❌ An error occurred while processing the image.');
  }
});
