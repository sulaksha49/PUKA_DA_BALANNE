

const { cmd } = require("../command");
const axios = require("axios");

cmd({
    pattern: "rdanime",
    alias: ["randomanime"],
    desc: "Get a random anime.",
    category: "fun",
    react: "🎥",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        // Requête à l'API pour obtenir un anime aléatoire
        const response = await axios.get("https://api.jikan.moe/v4/random/anime");

        // Extraire les données de l'anime
        const anime = response.data.data;
        const animeTitle = anime.title;
        const animeImage = anime.images.jpg.large_image_url;
        const animeSynopsis = anime.synopsis || "No synopsis available for this anime.";
        const animeEpisodes = anime.episodes || "N/A";  // Nombre d'épisodes
        const animeStatus = anime.status || "Status not available"; // Statut de l'anime (en cours, terminé, etc.)

        // Préparer la réponse avec les informations de l'anime
        const message = `🎥 𝐒𝐔𝐋𝐀-𝐌𝐃 *Random Anime:* \n\n*Title:* ${animeTitle} \n*Synopsis:* ${animeSynopsis} \n*Episodes:* ${animeEpisodes} \n*Status:* ${animeStatus}`;

        // Envoyer le message avec l'image et les informations supplémentaires
        await conn.sendMessage(m.chat, {
            image: { url: animeImage },
            caption: message
        }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply("⚠️ *An error occurred while fetching the anime. Please try again later.*");
    }
});
