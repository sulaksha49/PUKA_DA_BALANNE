const { cmd } = require('../command');
const axios = require('axios');

cmd(
  {
    pattern: "aiimg",
    alias: ["genboy", "genimg"],
    desc: "Generate AI profile picture",
    category: "ai",
    react: "🖼️",
    filename: __filename,
  },
  async (conn, mek, m, { from, args, reply }) => {
    try {
      let prompt = args.join(" ");
      if (!prompt) return reply("⚠️ Please provide a prompt! (Example: `.genpfp Red flowers`)");

      let apiUrl = `https://manul-ofc-tech-api-1e5585f5ebef.herokuapp.com/fluxai?prompt=${encodeURIComponent(prompt)}`;
      let response = await axios.get(apiUrl, { responseType: "arraybuffer" });

      await conn.sendMessage(
        from,
        { image: response.data, caption: `𝐒𝐔𝐋𝐀-𝐌𝐃 🎨 *AI Generated Image for:* _${prompt}_` },
        { quoted: m }
      );

    } catch (e) {
      console.error("GenPFP Command Error:", e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
