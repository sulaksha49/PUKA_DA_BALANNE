//    scraper    🌝💗

function xnxxsearch(query) {
	return new Promise((resolve, reject) => {
		const baseurl = 'https://www.xnxx.com'
		fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {method: 'get'})
		.then(res => res.text())
		.then(res => {
			let $ = cheerio.load(res, {
				xmlMode: false
			});
			let title = [];
			let url = [];
			let desc = [];
			let results = [];

			$('div.mozaique').each(function(a, b) {
				$(b).find('div.thumb').each(function(c, d) {
					url.push(baseurl+$(d).find('a').attr('href').replace("/THUMBNUM/", "/"))
				})
			})
			$('div.mozaique').each(function(a, b) {
				$(b).find('div.thumb-under').each(function(c, d) {
					desc.push($(d).find('p.metadata').text())
					$(d).find('a').each(function(e,f) {
					    title.push($(f).attr('title'))
					})
				})
			})
			for (let i = 0; i < title.length; i++) {
				results.push({
					title: title[i],
					info: desc[i],
					link: url[i]
				})
			}
			resolve({
				code: 200,
				status: true,
				result: results
			})
		})
		.catch(err => reject({code: 503, status: false, result: err }))
	})
}

function xnxxdl(URL) {
	return new Promise((resolve, reject) => {
		fetch(`${URL}`, {method: 'get'})
		.then(res => res.text())
		.then(res => {
			let $ = cheerio.load(res, {
				xmlMode: false
			});
			const title = $('meta[property="og:title"]').attr('content');
			const duration = $('meta[property="og:duration"]').attr('content');
			const image = $('meta[property="og:image"]').attr('content');
			const videoType = $('meta[property="og:video:type"]').attr('content');
			const videoWidth = $('meta[property="og:video:width"]').attr('content');
			const videoHeight = $('meta[property="og:video:height"]').attr('content');
			const info = $('span.metadata').text();
			const videoScript = $('#video-player-bg > script:nth-child(6)').html();
			const files = {
				low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
				high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
				HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
				thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
				thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
				thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
				thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1],
			};
			resolve({
				status: 200,
				result: {
					title,
					URL,
					duration,
					image,
					videoType,
					videoWidth,
					videoHeight,
					info,
					files
				}
			})
		})
		.catch(err => reject({code: 503, status: false, result: err }))
	})
}


//  scraper 🌝😁

const axios = require('axios');
const cheerio = require('cheerio'); // Import cheerio for HTML pa

cmd({
    pattern: "xvideo",
    alias: ["xvideo2"],
    react: "🎥",
    desc: "download",
    category: "download",
    filename: __filename
}, async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) return reply("*⚠️ Please provide a video title or URL*\n\n*Example:* .xvideo My MILF Secretary Love");

        const query = String(q);
        let results;
        let videoData;

        if (q.includes('xnxx.com')) {
            videoData = await xnxxdl(q);
            if (!videoData.status) {
                return reply("❌ Failed to fetch video data!");
            }
            results = {
                title: videoData.result.title,
                duration: videoData.result.duration,
                thumb: videoData.result.image,
                quality: 'HD',
                url: q
            };
        } else {
            const searchResult = await xnxxsearch(query);
            if (!searchResult.status || !searchResult.result.length) {
                return reply("❌ No results found! Please try another search.");
            }
            const firstResult = searchResult.result[0];
            videoData = await xnxxdl(firstResult.link);
            results = {
                title: firstResult.title,
                duration: videoData.result.duration,
                thumb: videoData.result.image,
                quality: 'HD',
                url: firstResult.link
            };
        }

        let desc = `🎥 *𝐒𝐔𝐋𝐀-𝐌𝐃 Downloading:* ${results.title}

⏱️ *Duration:* ${results.duration}
👁️ *Views:* ${results.views || 'N/A'}
📅 *Quality:* ${results.quality || 'N/A'}

⏳ *Please wait, processing your request...*`;

        if (config.BUTTON === 'true') {
            await conn.sendMessage(from, {
                image: { url: results.thumb },
                caption: desc,
                footer: "© 2025 Didula MD",
                buttons: [{
                    buttonId: `.download ${results.url}`,
                    buttonText: { displayText: 'Download Video 📥' },
                    type: 1
                }],
                headerType: 1,
                contextInfo: {
                    isForwarded: true,
                    mentionedJid: [m.sender],
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: "120363385281017920@newsletter",
                        newsletterName: "𝐒𝐔𝐋𝐀-𝐌𝐃"
                    }
                }
            }, { quoted: qtoko });
        } else {
            await conn.sendMessage(from, {
                image: { url: results.thumb },
                caption: desc
            }, { quoted: qtoko });
        }

        try {
            const videoUrl = videoData.result.files.high || videoData.result.files.low;
            if (!videoUrl) throw new Error("No download URL found");

            await conn.sendMessage(from, {
                video: { url: videoUrl },
                mimetype: "video/mp4",
                caption: "> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀_𝐌𝐃 😈"
            }, { quoted: qtoko });

        } catch (error) {
            reply("❌ Error downloading video: " + error.message);
        }

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});
