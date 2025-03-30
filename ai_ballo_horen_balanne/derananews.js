const config = require('../config')
const { cmd } = require('../command')
const axios = require('axios')
const { fetchJson } = require('../DATABASE/functions')

const apilink = 'https://www.dark-yasiya-api.site/news' // API LINK ( DO NOT CHANGE THIS!! )
    
/ ================================SIRASA NEWS========================================

cmd({
    pattern: "sirasanews",
    alias: ["sirasa","news2"],
    react: "🔺",
    desc: "",
    category: "news",
    use: '.sirasa',
    filename: __filename
},
async(conn, mek, m,{from, quoted }) => {
try{

const news = await fetchJson(`${apilink}/sirasa`)
  
const msg = `
           🔺 *SIRASA NEWS* 🔺

       
• *Title* - ${news.result.title}

• *News* - ${news.result.desc}

• *Link* - ${news.result.url}

> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀-𝐌𝐃 😈`

          // Sending the image with caption
          const sentMsg = await conn.sendMessage(from, {


          text: msg,
          contextInfo: {

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: '🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀-𝐌𝐃 😈',
          newsletterJid: "120363296605464049@newsletter",
          },
          externalAdReply: {
              title: `𝐒𝐔𝐋𝐀-𝐌𝐃 News Information`,
              body: `Can't Find The Information. You Can Try Another Way. Error Code 4043`,
              thumbnailUrl: news.result.image,
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });
} catch (e) {
console.log(e)
reply(e)
}
})

// ================================DERANA NEWS========================================

cmd({
    pattern: "derananews",
    alias: ["derana","news3"],
    react: "📑",
    desc: "",
    category: "news",
    use: '.derana',
    filename: __filename
},
async(conn, mek, m,{from, quoted }) => {
try{

const news = await fetchJson(`${apilink}/derana`)
  
const msg = `
           📑 *DERANA NEWS* 📑
       
• *Title* - ${news.result.title}

• *News* - ${news.result.desc}

• *Date* - ${news.result.date}

• *Link* - ${news.result.url}

> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀-𝐌𝐃 😈`

          // Sending the image with caption
          const sentMsg = await conn.sendMessage(from, {


          text: msg,
          contextInfo: {

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: '🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀-𝐌𝐃 😈',
          newsletterJid: "120363296605464049@newsletter",
          },
          externalAdReply: {
              title: `𝐒𝐔𝐋𝐀-𝐌𝐃 News Information`,
              body: `Can't Find The Information. You Can Try Another Way. Error Code 4043`,
              thumbnailUrl: news.result.image,
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });
} catch (e) {
console.log(e)
reply(e)
}
})

// ================================LANKADEEPA NEWS========================================

cmd({
    pattern: "lankadeepanews",
    alias: ["lankadeepa","news4"],
    react: "🕵️‍♂️",
    desc: "",
    category: "news",
    use: '.lankadeepanews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink}/lankadeepa`)
  
const msg = `
           🕵️‍♂️ *LANKADEEPA NEWS* 🕵️‍♂️

       
• *Title* - ${news.result.title}

• *News* - ${news.result.desc}

• *Date* - ${news.result.date}

• *Link* - ${news.result.url}

> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀-𝐌𝐃 😈`


          // Sending the image with caption
          const sentMsg = await conn.sendMessage(from, {


          text: msg,
          contextInfo: {

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: '🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀-𝐌𝐃 😈',
          newsletterJid: "120363296605464049@newsletter",
          },
          externalAdReply: {
              title: `𝐒𝐔𝐋𝐀-𝐌𝐃 News Information`,
              body: `Can't Find The Information. You Can Try Another Way. Error Code 4043`,
              thumbnailUrl: news.result.image,
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });
} catch (e) {
console.log(e)
reply(e)
}
})

// ================================BBC NEWS========================================

cmd({
    pattern: "bbcnews",
    alias: ["bbc","news5"],
    react: "⛩",
    desc: "",
    category: "news",
    use: '.bbcnews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink}/bbc`)
  
const msg = `
           ⛩ *BBC NEWS* ⛩

       
• *Title* - ${news.result.title}

• *News* - ${news.result.desc}

• *Link* - ${news.result.url} 

> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀-𝐌𝐃 😈`


          // Sending the image with caption
          const sentMsg = await conn.sendMessage(from, {


          text: msg,
          contextInfo: {

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: '🄿🄾🅆🄴🅁🄳 🅱🆈 𝐒𝐔𝐋𝐀-𝐌𝐃 😈',
          newsletterJid: "120363296605464049@newsletter",
          },
          externalAdReply: {
              title: `𝐒𝐔𝐋𝐀-𝐌𝐃 News Information`,
              body: `Can't Find The Information. You Can Try Another Way. Error Code 4043`,
              thumbnailUrl: news.result.image,
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });
} catch (e) {
console.log(e)
reply(e)
}
})
