const axios = require("axios");
const cheerio = require("cheerio");

const command = {
  pattern: "modapk",
  react: "📑",
  category: "download",
  desc: "modapk downloader",
  filename: __filename
};

cmd(command, async (bot, message, options, { from, prefix, q, l, isDev, reply }) => {
  try {
    if (!q) {
      return await reply("*Please provide search text..! 🖊️*");
    }

    const searchUrl = `https://an1.com/?story=${q}&do=search&subaction=search`;
    const response = await axios.get(searchUrl);
    const $ = cheerio.load(response.data);
    
    let results = [];

    $("div.item").each((index, element) => {
      results.push({
        link: $(element).find("a").attr("href"),
        title: $(element).find("div.name > a > span").text()
      });
    });

    if (config.MODE === "nonbutton") {
      const options = { quoted: message };

      if (results.length < 1) {
        return await bot.sendMessage(from, { text: "*No results found :(*" }, options);
      }

      let listItems = results.map((item, index) => ({
        title: `${index + 1}`,
        description: item.title,
        rowId: `${prefix}ma ${item.link}`
      }));

      const section = {
        title: "_[Result from an1]_",
        rows: listItems
      };

      const buttonOptions = {
        caption: "𝐒𝐔𝐋𝐀-𝐌𝐃 𝐌𝐎𝐃 𝐀𝐏𝐊",
        image: { url: "https://i.ibb.co/D5760gq/xwl2e6b5.png" },
        footer: config.FOOTER,
        title: "Result from an1. 📲",
        buttonText: "*🔢 Reply below number*",
        sections: [section]
      };

      return await bot.replyList(from, buttonOptions, options);
    }

    if (config.MODE === "button") {
      const options = { quoted: message };

      if (results.length < 1) {
        return await bot.sendMessage(from, { text: "No results found." }, options);
      }

      let buttonSections = results.map((item, index) => ({
        rows: [{
          title: `${index + 1}`,
          description: item.title,
          id: `${prefix}ma ${item.link}`
        }]
      }));

      let buttons = [
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: "Join Our Channel",
            url: "https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z",
            merchant_url: "https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z"
          })
        },
        {
          name: "single_select",
          buttonParamsJson: JSON.stringify({
            title: "Result from ModWhatsapp. 📲",
            sections: buttonSections
          })
        }
      ];

      const buttonMessage = {
        image: "https://i.ibb.co/D5760gq/xwl2e6b5.png",
        header: "",
        footer: config.FOOTER,
        body: "𝐒𝐔𝐋𝐀-𝐌𝐃 𝐌𝐎𝐃 𝐀𝐏𝐊"
      };

      return await bot.sendButtonMessage(from, buttons, message, buttonMessage, options);
    }
  } catch (error) {
    reply("*ERROR !!*");
    console.error(error);
  }
});
