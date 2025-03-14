const fs = require('fs');
const path = require('path');

const configFile = path.join(__dirname, '../autosong.json');

// Function to load & save autosong settings
const loadConfig = () => {
    if (!fs.existsSync(configFile)) fs.writeFileSync(configFile, JSON.stringify({}, null, 2));
    return JSON.parse(fs.readFileSync(configFile));
};

const saveConfig = (data) => fs.writeFileSync(configFile, JSON.stringify(data, null, 2));

const { cmd } = require('../command');

cmd({
    pattern: "autosong",
    alias: ["asong"],
    react: "🎶",
    desc: "Enable or Disable Auto Song Download",
    category: "settings",
    use: '.autosong on/off',
    filename: __filename
}, async (conn, mek, m, { from, prefix, q, reply }) => {
    if (!q || !["on", "off"].includes(q.toLowerCase())) {
        return reply(`🔹 *Usage:* ${prefix}autosong on/off`);
    }

    let config = loadConfig();
    config[from] = q.toLowerCase() === "on";  // Store as true/false
    saveConfig(config);

    reply(`✅ Auto Song Download has been *${q.toUpperCase()}* for this chat!`);
});
