const { fetchJson } = require('../lib/functions')
const cheerio = require('cheerio')
const axios = require('axios');
const { cmd, commands } = require('../command')
 
const seedr = require('seedr');
const { getBuffer , sleep } = require('../lib/functions');
const conf = require('../config.cjs')
const oce = "`";
const seedrClient = new seedr();
seedrClient.login("vajirarathnayaka891@gmail.com", "vajirarathnayaka891@"); // Replace with your Seedr credentials

const { sinhalaSub } = require('mrnima-moviedl'); // Make sure mrnima-moviedl is installed and supports search
const { url } = require('inspector');
const { config } = require('process');
const { link } = require('fs');

cmd({
    pattern: "sinhalasub",
    react: '📑',
    category: "movie",
    desc: "Search movies on sinhalasub and get download links",
    filename: __filename
}, async (conn, m, mek, { from, q,mnu,isME, reply }) => {
    try {
        if (!q) return await reply('*Please provide a search query! (e.g., Deadpool)*');
        
        var movie = await sinhalaSub();
        const results = await movie.search(q);
        const searchResults = results.result.slice(0, 10);
        
        if (!searchResults || searchResults.length === 0) {
            return await reply(`No results found for: ${q}`);
        }

        let resultsMessage = `📽️ *Search Results for* "${q}":\n\n`;
        searchResults.forEach((result, index) => {
            resultsMessage += `*${index + 1}.* ${result.title}\n🔗 Link: ${result.link}\n\n`;
        });

        const sentMsg = await conn.sendMessage(from, { text: resultsMessage }, { quoted: mek });
        const messageID = sentMsg.key.id;

        conn.addReplyTracker(messageID, async (mek, messageType) => {
          if (!mek.message) return;
          const from = mek.key.remoteJid;
          const sender = mek.key.participant || mek.key.remoteJid;
                const selectedNumber = parseInt(messageType.trim());
                if (!isNaN(selectedNumber) && selectedNumber > 0 && selectedNumber <= searchResults.length) {
                    const selectedMovie = searchResults[selectedNumber - 1];

                    const apiUrl = `https://api-site-2.vercel.app/api/sinhalasub/movie?url=${encodeURIComponent(selectedMovie.link)}`;
                    try {
                        const response = await axios.get(apiUrl);
                        const movieData = response.data.result;

                        // Only use `dl_links1` for PixelDrain links
                        const pixelDrainLinks = movieData.dl_links || [];
                        if (pixelDrainLinks.length === 0) {
                            return await reply('No PixelDrain links found.');
                        }

                        let downloadMessage = `🎥 *${movieData.title}*\n\n`;
                        downloadMessage += `*Available PixelDrain Download Links:*\n`;

                        pixelDrainLinks.forEach((link, index) => {
                            downloadMessage += `*${index + 1}.* ${link.quality} - ${link.size}\n\n`;
                        });

                        const pixelDrainMsg = await conn.sendMessage(from, { text: downloadMessage }, { quoted: mnu });
                        const pixelDrainMessageID = pixelDrainMsg.key.id;

                        conn.addReplyTracker(pixelDrainMessageID, async (mek, pdMessageType) => {
                          if (!mek.message) return;
                          const from = mek.key.remoteJid;
                          const sender = mek.key.participant || mek.key.remoteJid;
                                const qualityNumber = parseInt(pdMessageType.trim());
                                if (!isNaN(qualityNumber) && qualityNumber > 0 && qualityNumber <= pixelDrainLinks.length) {
                                    const selectedPixelDrainLink = pixelDrainLinks[qualityNumber - 1];
                                    const fileId = selectedPixelDrainLink.link.split('/').pop();
                                    await conn.sendMessage(from, { react: { text: '⬇️', key:  pixelDrainMsg.key } });

                                    const directDownloadUrl = `https://pixeldrain.com/api/file/${fileId}`;
                                    let sendto = '';
                                    if (isME) {
                                        sendto = conf.MOVIE_JID || from;
                                    } else {
                                        sendto = from;
                                    }
                                    
                                    let downloadMessag = `
🎬 *𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗫ᴾᴿᴼ 𝗖𝗜𝗡𝗘𝗠𝗔* 🎥  
╔══════════════════════════╗  
     𝙔𝙤𝙪𝙧 𝙂𝙖𝙩𝙚𝙬𝙖𝙮 𝙩𝙤  
      🎥 𝗘𝗻𝘁𝗲𝗿𝘁𝗮𝗶𝗻𝗺𝗲𝗻𝘁 🎥  
╚══════════════════════════╝  

✨ 🎥 **🎞 Movie:** *${movieData.title}*  

⭐ *𝗜𝗠𝗗𝗕 𝗥𝗮𝘁𝗶𝗻𝗴:* *${movieData.imdb}*  
📅 *𝗥𝗲𝗹𝗲𝗮𝘀𝗲 𝗗𝗮𝘁𝗲:* *${movieData.date}*  
🌍 *𝗖𝗼𝘂𝗻𝘁𝗿𝘆:* *${movieData.country}*  
⏳ *𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻:* *${movieData.runtime}*  

╔═════ஜ۩۞۩ஜ═════╗  
© 𝟸𝟶𝟸𝟻 *Queen Anju XPRO*  
🚀 *𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗚𝗮𝗺𝗶𝗻𝗴 𝗥𝗮𝘀𝗵*  
🔗 *GitHub:github.com/Mrrashmika/Queen_Anju-MD 
📡 _Stay Connected. Stay Entertained!_  
╚═════ஜ۩۞۩ஜ═════╝`;

                                    await conn.sendMessage(from, { react: { text: '⬆', key:  pixelDrainMsg.key } });
                                    
                                    
                                    await conn.sendMessage(sendto, {
                                        document: { url: directDownloadUrl },
                                        mimetype: "video/mp4",
                                        fileName: `${movieData.title} - ${selectedPixelDrainLink.quality}.mp4`,
                                        caption: downloadMessag,
                                        contextInfo: {
                                            mentionedJid: [],
                                            externalAdReply: {
                                                title: movieData.title,
                                                body: '*𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗫ᴾᴿᴼ 𝗖𝗜𝗡𝗘𝗠𝗔* 🎥',
                                                mediaType: 1,
                                                sourceUrl: selectedMovie.link,
                                                thumbnailUrl: movieData.image,
                                                renderLargerThumbnail: true
                                            }
                                        }
                                    }, { quoted: mnu });

                                    await conn.sendMessage(from, { react: { text: '✅', key:  pixelDrainMsg.key } });
                                } else {
                                    await reply('Invalid selection. Please reply with a valid number.');
                                }
                            }
                        );

                    } catch (error) {
                        console.error('Error fetching movie details:', error);
                        await reply('An error occurred while fetching movie details. Please try again.');
                    }
                } else {
                    await reply('Invalid selection. Please reply with a valid number.');
                }
            }
        );

    } catch (error) {
        console.error('Error during search:', error);
        reply('*An error occurred while searching!*');
    }
});




cmd({
  pattern: "cinesubz",
  alias: ["cine"],
  react: "🎬",
  desc: "Search and download movies from CineSubz",
  category: "movie",
  filename: __filename,
}, async (conn, m, mek, { from, q,mnu,isME, senderNumber, reply }) => {
  try {

    // Validate input query
    if (!q) {
      return await reply(
        "*Please provide a movie name to search! (e.g., Avatar)*"
      );
    }

    // Step 1: Search movies from CineSubz API
    const searchResponse = await fetchJson(
      `https://cinesubz-api-zazie.vercel.app/api/search?q=${encodeURIComponent(q)}`
    );
    const searchData = searchResponse;

    if (!searchData.status) {
      return await reply(`*No results found for:* "${q}"`);
    }

    const searchResults = searchData.result.data;
    let resultsMessage = `✨ *QUEEN ANJU CINESUBZ DOWNLOADER* ✨\n\n🎥 *Search Results for* "${q}":\n\n`;

    searchResults.forEach((result, index) => {
      resultsMessage += `*${index + 1}.* ${result.title} (${result.year})\n🔗 Link: ${result.link}\n\n`;
    });
    await sleep(2000);
    const sentMsg = await conn.sendMessage(
      from,
      { text: resultsMessage },
      { quoted: mek }
    );
    const messageID = sentMsg.key.id;

    // Step 2: Wait for the user to select a movie
    conn.addReplyTracker(messageID, async (mek, messageType) => {
      if (!mek.message) return;
      const from = mek.key.remoteJid;
      const sender = mek.key.participant || mek.key.remoteJid;
        const selectedNumber = parseInt(messageType.trim());
        if (
          !isNaN(selectedNumber) &&
          selectedNumber > 0 &&
          selectedNumber <= searchResults.length
        ) {
          const selectedMovie = searchResults[selectedNumber - 1];

          // Step 3: Fetch download links for the selected movie
          const movieResponse = await fetchJson(
            `https://cinesubz-api-zazie.vercel.app/api/movie?url=${encodeURIComponent(
              selectedMovie.link
            )}`
          );
          const movieData = movieResponse;

          if (!movieData.status || !movieData.result.data.dl_links) {
            return await reply("*Error fetching download links for this movie.*");
          }

          const { title, imdbRate, image, date, country, duration, dl_links } =
            movieData.result.data;

          if (dl_links.length === 0) {
            return await reply(
              "*No download links available for this movie.*"
            );
          }

          let downloadMessage = `🎥 *${title}*\n\n`;
          downloadMessage += `*Available Download Links:*\n`;

          dl_links.forEach((link, index) => {
            downloadMessage += `*${index + 1}.* ${link.quality} - ${link.size}\n\n`;
          });
         let download = dl_links;
          const sentDownloadMsg = await conn.sendMessage(
            from,
            {
              text: downloadMessage
            },
            { quoted: mnu }
          );

          const downloadMessageID = sentDownloadMsg.key.id;

          // Step 4: Wait for the user to select a download quality
          conn.addReplyTracker(downloadMessageID, async (mek, downloadMessageType) => {
            if (!mek.message) return;
            const from = mek.key.remoteJid;
            const sender = mek.key.participant || mek.key.remoteJid;
              const selectedQuality = parseInt(downloadMessageType.trim());
              if (
                !isNaN(selectedQuality) &&
                selectedQuality > 0 &&
                selectedQuality <= download.length
              ) {
                const selectedLink = download[selectedQuality - 1];
                const movieLinkResponse = await fetchJson(
                  `https://cinesubz-api-zazie.vercel.app/api/links?url=${encodeURIComponent(
                    selectedLink.link
                  )}`
                );
                const movieLinkData = movieLinkResponse;


                const downloadUrl = movieLinkData.result.direct;
                let sendto = '';
if (isME) {
  sendto = conf.MOVIE_JID || from;
} else {
  sendto = from;
}

let downloadMessag = `
🎬 *𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗫ᴾᴿᴼ 𝗖𝗜𝗡𝗘𝗠𝗔* 🎥  
╔══════════════════════════╗  
   𝙔𝙤𝙪𝙧 𝙂𝙖𝙩𝙚𝙬𝙖𝙮 𝙩𝙤  
    🎥 𝗘𝗻𝘁𝗲𝗿𝘁𝗮𝗶𝗻𝗺𝗲𝗻𝘁 🎥  
╚══════════════════════════╝  

✨ 🎥 **🎞 Movie:** *${title}*  

⭐ *𝗜𝗠𝗗𝗕 𝗥𝗮𝘁𝗶𝗻𝗴:* *${imdbRate}*  
📅 *𝗥𝗲𝗹𝗲𝗮𝘀𝗲 𝗗𝗮𝘁𝗲:* *${date}*  
🌍 *𝗖𝗼𝘂𝗻𝘁𝗿𝘆:* *${country}*  
⏳ *𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻:* *${duration}*  

╔═════ஜ۩۞۩ஜ═════╗  
© 𝟸𝟶𝟸𝟻 *Queen Anju XPRO*  
🚀 *𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗚𝗮𝗺𝗶𝗻𝗴 𝗥𝗮𝘀𝗵*  
🔗 *GitHub:github.com/Mrrashmika/Queen_Anju-MD 
📡 _Stay Connected. Stay Entertained!_  
╚═════ஜ۩۞۩ஜ═════╝`;
                await conn.sendMessage(from, { react: { text: '⬆️', key:sentDownloadMsg.key } });
                              
                await conn.sendMessage(
                  sendto,
                  {
                    document: { url: downloadUrl },
                    mimetype: "video/mp4",
                    fileName: `${title} - ${selectedLink.quality}.mp4`,
                    caption: downloadMessag,
                    contextInfo: {
                      mentionedJid: [], // specify mentioned JID(s) if any
                      groupMentions: [],
                      forwardingScore: 999,
                      isForwarded: true,
                      forwardedNewsletterMessageInfo: {
                          newsletterJid: '120363299978149557@newsletter',
                          newsletterName: "© 𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗑ᴾᴿᴼ 💚",
                          serverMessageId: 999
                      },
                      externalAdReply: {
                          title: title,
                          body: '🎬 *𝚀𝚄𝙴𝙴𝙽 𝙰𝙽𝙹𝚄 𝗫ᴾᴿᴼ 𝗖𝗜𝗡𝗘𝗠𝗔* 🎥',
                          mediaType: 1,
                          sourceUrl:selectedMovie.link,
                          thumbnailUrl:` ${image}`, // This should match the image URL provided above
                          renderLargerThumbnail: true,
                          showAdAttribution: true
                      }
                  }
                  },
                  { quoted: mnu }
                );

                await conn.sendMessage(from, { react: { text: '✅', key:sentDownloadMsg.key} });
              } else {
                await reply("Invalid selection. Please reply with a valid number.");
              }
            }
          );
        } else {
          await reply("Invalid selection. Please reply with a valid number.");
        }
      }
    );
  } catch (e) {
    console.error("Error during CineSubz command execution:", e);
    reply("*An error occurred while processing your request.*");
  }
});

  

cmd({
    pattern: "ytsmx",
    react: "📑",
    category: "search",
    desc: "Search movies on YTS.mx and get download links",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return await reply('*Please provide a search query! (e.g., Inception)*');

        const searchUrl = `https://yts.mx/browse-movies/${q}/all/all/0/latest/0/all`;
        const response = await axios.get(searchUrl);
        const $ = cheerio.load(response.data);

        let movies = [];
        $("section > div.row > div").each((index, element) => {
            const title = $(element).find("div.browse-movie-bottom > a").text();
            const year = $(element).find("div.browse-movie-bottom > div").text();
            const link = $(element).find("a").attr("href");
            const rating = $(element).find("a > figure > figcaption > h4.rating").text();
            const image = $(element).find("a > figure > img").attr("src");

            if (title && link) {
                movies.push({ title, year, link, rating, image });
            }
        });

        if (movies.length === 0) {
            return await reply(`No results found for: ${q}`);
        }

        let resultsMessage = `*✘~✘~✘𝚈𝚃𝚂.𝙼𝚇 𝚂𝙴𝙰𝚁𝙲𝙷✘~✘~✘*

*🔍 Search Results For:* ${q}
▬▬▬▬▬▬▬▬▬▬▬
🎞️ YTS.MX
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
\n`;
        movies.slice(0, 10).forEach((movie, index) => {
            resultsMessage += `*${index + 1}.* ${movie.title} (${movie.year})\n`;
        });

        const sentMsg = await conn.sendMessage(from, { text: resultsMessage }, { quoted: mek });
        const messageID = sentMsg.key.id;

        // Listener for movie selection
        const movieSelectionListener = async (messageUpdate) => {
            const replyMek = messageUpdate.messages[0];
            if (!replyMek.message) return;
            const messageType = replyMek.message.conversation || replyMek.message.extendedTextMessage?.text;
            const senderJid = replyMek.key.remoteJid;

            if (replyMek.message.extendedTextMessage?.contextInfo?.stanzaId === messageID && senderJid === from) {
                const selectedIndex = parseInt(messageType.trim()) - 1;
                if (selectedIndex < 0 || selectedIndex >= movies.length) {
                    return await reply('Invalid selection. Please reply with a valid number.');
                }

                const selectedMovie = movies[selectedIndex];
                const moviePageResponse = await axios.get(selectedMovie.link);
                const $$ = cheerio.load(moviePageResponse.data);

                let torrents = [];
                $$("div.modal.modal-download.hidden-xs.hidden-sm > div > div > div").each((index, element) => {
                    torrents.push({
                        quality: $(element).find("div > span").text(),
                        size: $(element).find("p.quality-size").eq(1).text(),
                        type: $(element).find("p.quality-size").eq(0).text().trim(),
                        magnet: $(element).find("a.magnet-download.download-torrent.magnet").attr("href")
                    });
                });

                if (torrents.length === 0) {
                    return await reply('No download links found for the selected movie.');
                }

                let torrentMessage = `*Available Qualities for* "${selectedMovie.title}":\n\n`;
                torrents.forEach((torrent, index) => {
                    torrentMessage += `*${index + 1}.* ${torrent.quality} (${torrent.size} ${torrent.type})\n`;
                });
                torrentMessage += `\n📩 *Please reply with the option number to download.*`;

                const optionsMsg = await conn.sendMessage(from, { text: torrentMessage }, { quoted: replyMek });
                const optionsMessageID = optionsMsg.key.id;

                // Listener for quality selection
                const qualitySelectionListener = async (optionUpdate) => {
                    const optionReply = optionUpdate.messages[0];
                    if (!optionReply.message) return;
                    const optionType = optionReply.message.conversation || optionReply.message.extendedTextMessage?.text;

                    if (optionReply.message.extendedTextMessage?.contextInfo?.stanzaId === optionsMessageID && optionReply.key.remoteJid === from) {
                        const selectedQualityIndex = parseInt(optionType.trim()) - 1;
                        if (selectedQualityIndex < 0 || selectedQualityIndex >= torrents.length) {
                            return await reply('Invalid option. Please reply with a valid number.');
                        }

                        const selectedTorrent = torrents[selectedQualityIndex];

                        // Add torrent to Seedr
                        const magnetResponse = await seedrClient.addMagnet(selectedTorrent.magnet);
                        if (magnetResponse.code === 400 || magnetResponse.result !== true) {
                            return await reply('Failed to add magnet link to Seedr.');
                        }

                        let videoData = [];
                        do {
                            videoData = await seedrClient.getVideos();
                        } while (videoData.length === 0);

                        const fileData = await seedrClient.getFile(videoData[0][0].id);
                        const folderId = videoData[0][0].fid;
                        const videoUrl = fileData.url;

                        const originalFileName = fileData.name || `${selectedMovie.title} ${selectedMovie.year} [${selectedTorrent.quality}] [${selectedTorrent.type}] [YTS.MX].mp4`;

// Construct the caption and remove .mp4 only from the file name if it exists
                        const fileNameWithoutMp4 = fileData.name ? fileData.name.replace(/\.mp4$/, '') : `${selectedMovie.title} ${selectedMovie.year} [${selectedTorrent.quality}] [${selectedTorrent.type}] [YTS.MX]`;
                        const caption = `${fileNameWithoutMp4}\n\n${oce}${selectedTorrent.quality} ${selectedTorrent.type}${oce}\n\n> ＱＵＥＥＮＺＡＺＩＥ-ＭＤ-Ｖ3`;
                        
                        await conn.sendMessage(from, { react: { text: "⬆️", key: optionReply.key } });
                        
                        await conn.sendMessage(from, {
                            document: await getBuffer(videoUrl),
                            mimetype: "video/mp4",
                            fileName: originalFileName,
                            caption: caption,
                        });

                        await conn.sendMessage(from, { react: { text: "✔️", key: optionReply.key } });

                        await seedrClient.deleteFolder(folderId);
                        await reply('Movie sent successfully!');
                    }
                };

                conn.ev.on('messages.upsert', qualitySelectionListener);
            }
        };

        conn.ev.on('messages.upsert', movieSelectionListener);
    } catch (error) {
        console.error('Error during YTS.mx search:', error);
        reply('*An error occurred while searching!*');
    }
});


cmd({
  pattern: "1337x",
  react: "🔍",
  category: "search",
  desc: "Search and download movies from 1337x",
  filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
  try {
      if (!q) return await reply('*Please provide a search query! (e.g., The Lion King)*');

      const searchUrl = `https://www.1337xx.to/search/${encodeURIComponent(q)}/1/`;
      const response = await axios.get(searchUrl);
      const $ = cheerio.load(response.data);

      let movies = [];
      $("div.table-list-wrap > table > tbody tr").each((index, element) => {
          const title = $(element).find("td.coll-1.name > a:nth-child(2)").text().trim();
          const size = $(element).find("td.coll-4.size.mob-uploader").text().trim();
          const link = $(element).find("td.coll-1.name > a:nth-child(2)").attr("href");
          if (title && link) {
              movies.push({
                  title,
                  size,
                  link: `https://www.1337xx.to${link}`
              });
          }
      });

      if (movies.length === 0) {
          return await reply(`No results found for: ${q}`);
      }

      let resultsMessage = `*1337x Search Results for:* ${q}\n\n`;
      movies.slice(0, 10).forEach((movie, index) => {
          resultsMessage += `*${index + 1}.* ${movie.title} (${movie.size})\n`;
      });

      const sentMsg = await conn.sendMessage(from, { text: resultsMessage }, { quoted: mek });
      const messageID = sentMsg.key.id;

      // Listener for movie selection
      const movieSelectionListener = async (messageUpdate) => {
          const replyMek = messageUpdate.messages[0];
          if (!replyMek.message) return;
          const messageType = replyMek.message.conversation || replyMek.message.extendedTextMessage?.text;

          if (replyMek.message.extendedTextMessage?.contextInfo?.stanzaId === messageID && replyMek.key.remoteJid === from) {
              const selectedIndex = parseInt(messageType.trim()) - 1;
              if (selectedIndex < 0 || selectedIndex >= movies.length) {
                  return await reply('Invalid selection. Please reply with a valid number.');
              }

              const selectedMovie = movies[selectedIndex];
              const moviePageResponse = await axios.get(selectedMovie.link);
              const $$ = cheerio.load(moviePageResponse.data);

              const magnetLink = $$('.torrentdown1').attr('href');
              if (!magnetLink) {
                  return await reply('Magnet link not found for the selected movie.');
              }

              // Add magnet link to Seedr
              const seedrResponse = await seedrClient.addMagnet(magnetLink);
              if (!seedrResponse || seedrResponse.code === 400) {
                  return await reply('Failed to add magnet link to Seedr.');
              }

              let videos = [];
              do {
                  videos = await seedrClient.getVideos();
              } while (videos.length === 0);

              const fileData = await seedrClient.getFile(videos[0][0].id);
              const folderId = videos[0][0].fid;
              const videoUrl = fileData.url;
              await conn.sendMessage(from, { react: { text: "⬆️", key: replyMek.key } });
              await conn.sendMessage(from, {
                  document: await getBuffer(videoUrl),
                  mimetype: "video/mp4",
                  fileName: fileData.name || `${selectedMovie.title}.mp4`,
                  caption: `*🎥 ${selectedMovie.title}*\n\nEnjoy your movie!`
              });

              // Clean up Seedr folder
              await seedrClient.deleteFolder(folderId);
              await reply('Movie sent successfully!');
          }
      };

      conn.ev.on('messages.upsert', movieSelectionListener);
  } catch (error) {
      console.error('Error:', error);
      reply('*An error occurred while searching or downloading!*');
  }
});
