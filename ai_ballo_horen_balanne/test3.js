const { cmd, commands } = require('../lib/command');
const { getRandom, fetchJson } = require('../lib/functions');
const { image2url } = require("@dark-yasiya/imgbb.js");
const fs = require('fs');
const fileType = require("file-type");
const axios = require("axios");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const path = require("path");
const googleTTS = require("google-tts-api");
const ffmpeg = require('fluent-ffmpeg');
const FormData = require("form-data");
const REMOVE_BG_API_KEY = "ApFQTmjGsYJ7WQWmNDbrGz4j";


const removebg = {
  pattern: "removebg",
  react: '🔥',
  alias: ['rb'],
  category: "convert",
  use: ".removebg <reply image>",
  filename: __filename
};
cmd(removebg, async (sock, message, m, { from, reply, quoted }) => {
  try {
    const isViewOnce = m.quoted ? m.quoted.type === "viewOnceMessage" : false;
    const isImage = m.quoted 
      ? m.quoted.type === "imageMessage" || (isViewOnce ? m.quoted.msg.type === "imageMessage" : false) 
      : false;

    if (m.type === "imageMessage" || isImage) {
      const randomFile = `temp_${Date.now()}`;
      const downloaded = isImage ? await m.quoted.download() : await m.download();
      const fileTypeData = await fileType.fromBuffer(downloaded);

      if (!fileTypeData || (fileTypeData.ext !== "jpg" && fileTypeData.ext !== "png")) {
        return reply("⚠️ Only JPG or PNG images are supported!");
      }

      const imagePath = `./${randomFile}.${fileTypeData.ext}`;
      await fs.promises.writeFile(imagePath, downloaded);

      // Remove background using Remove.bg API
      const formData = new FormData();
      formData.append("image_file", fs.createReadStream(imagePath));
      formData.append("size", "auto");

      const response = await axios.post("https://api.remove.bg/v1.0/removebg", formData, {
        headers: {
          "X-Api-Key": REMOVE_BG_API_KEY,
          ...formData.getHeaders() // This now works properly
        },
        responseType: "arraybuffer"
      });

      if (response.status !== 200) {
        return reply("❌ Failed to remove background.");
      }

      // Send processed image
      await sock.sendMessage(from, {
        image: response.data,
        caption: "> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀-𝐌𝐃 😈"
      }, { quoted: message });

      // Delete temp image file
      await fs.promises.unlink(imagePath);
    } else {
      reply("⚠️ Please reply to an image message.");
    }
  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while processing the image.");
  }
});
