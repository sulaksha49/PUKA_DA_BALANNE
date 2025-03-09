const axios = require('axios');
const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, fetchApi} = require('../lib/functions')
const fetch = require('node-fetch');
var os = require('os')
const { File } = require('megajs');
const { storenumrepdata } = require('../lib/nonbutton')
function formatNumber(num) {
    return String(num).padStart(2, '0');
} 


//===============================================================================
var url = "Give me movie name ?"
var valid_url = "This Url Type is Invalid"
var not_sudo = 'Your not premier user 🚫									   					  	                 💸 please contact us and purchase the movie download facility                                                                                                              😈Contact Owner : 0760663483'
var not_fo = 'I can\'t find anyting'
var giveme = "Please give me movie or tv show name"


const apilink = "https://www.dark-yasiya-api.site"
//===============================================================================

cmd({
    pattern: "sinhalasub",
    alias: ["mv3","sin"],
    react: "🎥",
    desc: "Download movie for sinhalasub.lk",
    category: "download",
    use: '.sinhalasub < Movie Name >',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, isDev, senderNumber, isPreUser, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const sudoNumber = config.SUDO;
	

if(!q) return await reply(giveme)
	
const movs = await fetchApi(`${apilink}/movie/sinhalasub/search?text=${q}`)
var ty = ''
let mov = movs.result.data
let numrep = []
  
if (movs.result.data.length < 1) return await reply(not_fo)

		
let cot = `🔮 *𝗦𝗜𝗡𝗛𝗔𝗟𝗔𝗦𝗨𝗕𝗟𝗞 𝗠𝗢𝗩𝗜𝗘 𝗦𝗘𝗔𝗥𝗖𝗛 𝗦𝗬𝗦𝗧𝗘𝗠* 🔮


📲 Input: *${q}*


`
	
	                mov.forEach((movie, index) => {
				
		  if(movie.type == 'TV' ) ty = 'sitvjid '
                  if(movie.type == 'Movie' ) ty = 'simvjid ' 
				
                  cot += ` *${formatNumber( index + 1)} ||* ${movie.title} | ${movie.type}\n\n`
				
                  numrep.push(`${prefix}${ty}${movie.link}` )
                  })	      
  
	

	 const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}`}, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }

await storenumrepdata(jsonmsg) 

} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(e)
}
})


cmd({
    pattern: "simvjid",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const sudoNumber = config.SUDO;
	
if(!q) return await reply(url)
    if (!q.includes('sinhalasub.lk/movies')) return await reply(valid_url)
  
const move = await fetchApi(`${apilink}/movie/sinhalasub/movie?url=${q}`)
let mov = move.result.data
      
    
let cot = `🎬 *𝐒𝐔𝐋𝐀-𝐌𝐃 𝖬𝖮𝖵𝖨𝖤 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 🎬


   📽️ Movie Name: ${mov.title}
   🍟 Release Date: ${mov.date}
   ⏱ Duration: ${mov.runtime}
   🖇️ Movie Link: ${q}

*${formatNumber(1)} ||* SEND MOVIE
`
  
  let numrep = []
	
	numrep.push(`${prefix}simvgo ${q}🎈${from}`)  

                 

for (let j = 0 ; j < config.JIDS.length; j++) {

                  cot += `*${formatNumber( j + 2)} ||* SEND JID: *${i}*\n`
				
                  numrep.push(`${prefix}simvgo ${q}🎈${i}` )
               
     }
  
 const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}` }, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }

await storenumrepdata(jsonmsg) 
await sleep(1 * 1000) 
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(e)
}
})


cmd({
    pattern: "simvgo",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const sudoNumber = config.SUDO;
	
  
	      var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}    
	

if(!inp) return
    if (!q.includes('sinhalasub.lk/movies')) return await reply(valid_url)
  
const move = await fetchApi(`${apilink}/movie/sinhalasub/movie?url=${inp}`)
let mov = move.result.data
	
    
let cot = `🎬 *𝐒𝐔𝐋𝐀-𝐌𝐃 𝖬𝖮𝖵𝖨𝖤 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 🎬


  📽️ Movie Name: ${mov.title}
  🍟 Release Date: ${mov.date}   
  🌍 Country: ${mov.country}
  ⏱ Duration: ${mov.runtime}  
  🖇️ Movie Link: ${inp}   
  🎀 Category: ${mov.category}
  ⭐ Imdb: ${mov.imdbRate}   
  🤵 Director: ${mov.director}

▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃


*${formatNumber(1)} ||* SEND DETAILS NORMAL IMG
*${formatNumber(2)} ||* SEND IMAGES

`
  
let numrep = []
numrep.push(`${prefix}simvdet ${q}`) 	
numrep.push(`${prefix}sinhimages ${q}`) 
var dl_type = ''	
	

		                mov.dl_links.forEach((movie, index) => {
				
		  if(movie.link.includes('mega.nz')) dl_type = 'MEGA-CLOUD'
      if(movie.link.includes('pixeldrain.com')) dl_type = 'PIXELDRAIN'
		  if(movie.link.includes('ddl.sinhalasub.net')) dl_type = 'DDL-SINHALASUB'
		  if(movie.link.includes('ssl.sinhalasub01.workers.dev/')) dl_type = 'SINHALASUB01-WORKERS'

				
                  cot += `*${formatNumber( index + 3)} ||* ${movie.quality} *( ${movie.size} )*\n[ ${dl_type} ]\n`
				
                  numrep.push(`${prefix}sinedirectdl ${movie.link}🎈${mov.title}🎈${movie.quality}🎈${movie.size}🎈${jidx}🎈${mov.mainImage}` )
                  })
                 

 const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}` }, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }

await storenumrepdata(jsonmsg) 
await sleep(1 * 1000) 
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(e)
}
})



cmd({
    pattern: "sitvjid",
    react: "📺",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const sudoNumber = config.SUDO;
	
if(!q) return await reply(url)
    if (!q.includes('sinhalasub.lk/tvshow')) return await reply(valid_url)
  
const move = await fetchApi(`${apilink}/movie/sinhalasub/tvshow?url=${q}&apikey=${apikey}`)
let mov = move.result.data
      
    
let cot = `📺 *𝐒𝐔𝐋𝐀-𝐌𝐃 𝖳𝖵 𝖲𝖧𝖮𝖶 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 📺


  📽 Tv Show Name: ${mov.title}
  ✨ First Air Date: ${mov.date}
  🤵‍♂️ Director: ${mov.director}
  🖇️ Tv Show Link: ${q}

*${formatNumber(1)} ||* SEND INBOX
`
  
  let numrep = []
	
	numrep.push(`${prefix}sitvgo ${q}🎈${from}`)  

                 

for (let j = 0 ; j < config.JIDS.length; j++) {
     for (let i of config.JIDS[j].split(",") ){
                  cot += `*${formatNumber( j + 2)} ||* SEND JID: *${i}*\n`
				
                  numrep.push(`${prefix}sitvgo ${q}🎈${i}` )
                
     }}
  
 const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}` }, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }

        await storenumrepdata(jsonmsg) 
	await sleep(1*1000) 
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(e)
}
})


cmd({
    pattern: "sitvgo",
    alias: ["tv","sintv"],
    react: "📺",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const sudoNumber = config.SUDO;
	
  
	      var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}    
	

if(!inp) return await reply(err)
    if (!q.includes('sinhalasub.lk/tvshow')) return await reply(valid_url)
  
const move = await fetchApi(`${apilink}/movie/sinhalasub/tvshow?url=${inp}`)
let mov = move.result.data
    
let cot = `📺 *𝐒𝐔𝐋𝐀-𝐌𝐃 𝖳𝖵 𝖲𝖧𝖮𝖶 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 📺


  📽 Tv Show Name: ${mov.title}
  ✨ First Air Date: ${mov.date}
  🖇️ Tv Show Link: ${inp}
  🎀 Categories: ${mov.category}
  🤵‍♂️ Director: ${mov.director}
  ⭐ IMDB RATIN: ${mov.imdb}


 
*${formatNumber(1)} ||* SEND DETAILS


`
  
let numrep = []
numrep.push(`${prefix}sitvdet ${q}`) 
	

		                mov.episodes.forEach((movie, index) => {
				
                  cot += `*${formatNumber( index + 2)} ||*  ${movie.title} ( ${movie.date} )\n\n`
				
                  numrep.push(`${prefix}siepgo ${movie.episode_link}🎈${jidx}` )
                  })
                 

 const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}` }, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }

        await storenumrepdata(jsonmsg) 
	await sleep(1 * 1000) 
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(e)
}
})



cmd({
    pattern: "siepgo",
    react: "📺",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const sudoNumber = config.SUDO;
	
  
	      var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}    
	

if(!inp) return await reply(msr.err)
    if (!q.includes('sinhalasub.lk/episodes')) return await reply(valid_url)
  
const move = await fetchApi(`${apilink}/movie/sinhalasub/episode?url=${inp}`)
let mov = move.result.data
    

let cot = `📺 *𝐒𝐔𝐋𝐀-𝐌𝐃 𝖳𝖵 𝖲𝖧𝖮𝖶 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 📺


  📽 ${oce3}Episode Title:${oce3} ${mov.title}
  🎡 ${oce3}Episode Name:${oce3} ${mov.ep_name}
  🖇️ ${oce3}Tv Show Link:${oce3} ${inp}
  🧿 ${oce3}Release Date :${oce3} ${mov.date}


*${formatNumber(1)} ||* SEND DETAILS NORMAL IMG
*${formatNumber(2)} ||* SEND IMAGES

`
	
var dl_type = ''	  
let numrep = []
numrep.push(`${prefix}siepdet ${q}`)
numrep.push(`${prefix}sinhimages ${q}`) 
	

		                mov.dl_links.forEach((movie, index) => {
				
		  if(movie.link.includes('mega.nz')) dl_type = 'MEGA-CLOUD'
                  if(movie.link.includes('pixeldrain.com')) dl_type = 'PIXELDRAIN'
		  if(movie.link.includes('ddl.sinhalasub.net')) dl_type = 'DDL-SINHALASUB' 
                  if(movie.link.includes('ssl.sinhalasub01.workers.dev/')) dl_type = 'SINHALASUB01-WORKERS'

		  //if(!movie.link.includes('mega.nz' && 'ddl.sinhalasub.net' && 'pixeldrain.com')) dl_type = '..?'
				
                  cot += `*${formatNumber( index + 3)} ||* ${movie.quality} *( ${movie.size} )*\n[ ${dl_type} ]\n`
				
                  numrep.push(`${prefix}sinedirectdl2 ${movie.link}🎈${mov.title}🎈${movie.quality}🎈${movie.size}🎈${jidx}` )
                  })
                 

 const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}` }, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }

        await storenumrepdata(jsonmsg) 
	await sleep(1 * 1000) 
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(e)
}
})

//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

cmd({
    pattern: "simvdet",
    react: "📽️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, prefix, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const sudoNumber = config.SUDO;
	
if(!q) return await reply(url)
    if (!q.includes('sinhalasub.lk/movies')) return await reply(valid_url)

  
	var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}   

	
const anu = await fetchApi(`${apilink}/movie/sinhalasub/movie?url=${inp}`)
let mov = anu.result.data	

var cast = ''
      for (let i of mov.cast ){ 
  cast += i.reall_name + ','
	  }
	
  
let yt = `
🍟 _*${mov.title}*_

🧿 Release Date: ➜ ${mov.date}
🌍 Country: ${mov.country}
⏱️ Duration: ${mov.runtime}
🖇️ Movie Link: ${inp}
🎀 Categories: ${mov.category}
⭐ IMDB RATIN: ${mov.imdbRate}
🔮 IMDB VOTE: ${mov.imdbVoteCount}
🤵‍♂️ Director: ${mov.director}
🕵️‍♂️ Cast: ${cast}
`
const jid = jidx || from
await conn.sendMessage(jid ,  { image : { url : mov.images[0] || mov.image || config.LOGO } , caption : yt + `


${config.CAPTION}` })

await conn.sendMessage(from, { text : 'Details Card Sended ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
await sleep(1000 * 1) 
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(e)
}
})	


cmd({
    pattern: "sitvdet",
    react: "📺",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, prefix, isCmd, command, args, q, backup, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const sudoNumber = config.SUDO;
	
if(!q) return await reply(url)
    if (!q.includes('sinhalasub.lk/tvshow')) return await reply(valid_url)
 				
	
	
	var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}   

	
const anu = await fetchApi(`${apilink}/movie/sinhalasub/tvshow?url=${inp}&apikey=${apikey}`)
let mov = anu.result.data	


  
let yt = `
📺 *Tv Show Name:* ${mov.title}
✨ *First Air Date:* ${mov.date}
🖇️ *Tv Show Link:* ${inp}
🎀 *Categories:* ${mov.category}
🤵‍♂️ *Director:* ${mov.director}
⭐ *IMDB RATIN:* ${mov.imdb}
`
const jid = jidx || from

await conn.sendMessage(jid ,  { image : { url : mov.image } , text : yt + `


${config.CAPTION}`})



await conn.sendMessage(from, { text : 'Details Card Sended ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
await sleep(1000 * 1)
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(e)
}
})


cmd({
    pattern: "siepdet",
    react: "📺",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, prefix, isCmd, command, args, q, backup, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const sudoNumber = config.SUDO;
	
if(!q) return await reply(url)
    if (!q.includes('sinhalasub.lk/episode')) return await reply(valid_url)
 				
	
	
	var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}   

	
const anu = await fetchApi(`${apilink}/movie/sinhalasub/episode?url=${inp}`)
let mov = anu.result.data	


  
let yt = `
📺 *Episode Title:* ${mov.title}

🎡 *Episode Name:* ${mov.ep_name}

🖇️ *Tv Show Link:* ${inp}

🧿 *Release Date :* ${mov.date}
`
	
const jid = jidx || from

await conn.sendMessage(jid ,  { image : { url : mov.images[0] || '' } , caption : yt + `


${config.CAPTION}`})

await conn.sendMessage(from, { text : 'Details Card Sended ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
await sleep(1000 * 1)
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(e)
}
})



//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
cmd({
    pattern: "sinedirectdl2",
    alias: ["sinedirectdl"],
    react: "⬆",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, backup, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, form, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const sudoNumber = config.SUDO;
	

if(!q) return reply('"❗ *Please give me valid link*')	

        var typ = ''
				var inp = ''
	      var jidx = ''
				var nmf = ''
				var size = ''
			  var quality = ''
				var text = q
				if (q.includes('🎈')) nmf = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]
              quality =  text.split('🎈')[2]
							size =  text.split('🎈')[3]
							jidx =  text.split('🎈')[4]
							}
	
							 
if (!inp) return reply("*An error occurred 🧑‍🎨❌*")	
const jid = jidx || from

    

//MEGA.NZ
if(inp.includes("mega.nz")) {
	
const up_mg = await conn.sendMessage(from, { text : 'Uploading Your Request Movie..⬆' }, {quoted: mek})
	
	
        const file = File.fromURL(inp)
        await file.loadAttributes()
      //  if (file.size >= config.MAX_SIZE * 1024 * 1024) return reply(`File size exeeded...\nMaximum Upload Size Is ${config.MAX_SIZ} MB`)
	const data = await file.downloadBuffer();
	

	
            await conn.sendMessage(jid, { 
		    document: data, 
		    mimetype: "video/mp4", 
		    fileName: `[ŋąɖɛɛŋ]${nmf}.mp4`, 
		    caption: nmf + ` ( ${quality} )
      
` + config.CAPTION
	    }); 
	
await conn.sendMessage(from, { delete: up_mg.key })
await conn.sendMessage(from, { text : 'File Send Succesfull ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
await sleep(1000 * 1)
	
} else if (inp.includes("ddl.sinhalasub.net" || "ssl.sinhalasub01.workers.dev")) {


const up_mg = await conn.sendMessage(from, { text : 'Uploading Your Request Movie..⬆' }, {quoted: mek})
		     
const mvdoc = await conn.sendMessage( jid , { 
		document : { url: await getBuffer(inp) }, 
		fileName: `[ŋąɖɛɛŋ]${nmf}.mp4`,
		mimetype: "video/mp4", 
		caption:  nmf + ` ( ${quality} )

` + config.CAPTION
	})
	
await conn.sendMessage(from, { delete: up_mg.key })
	
await conn.sendMessage(from, { text : 'File Send Succesfull ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
await sleep(1000 * 1)

	
} else if(inp.includes('https://pixeldrain.com/u/'))  {
inp = inp.replace('/u/' , '/api/file/')
	
const up_mg = await conn.sendMessage(from, { text : 'Uploading Your Request Video..⬆' }, {quoted: mek})
		     
const mvdoc = await conn.sendMessage( jid , { 
		document : { url: inp + "?download" }, 
		fileName: `[ŋąɖɛɛŋ]${nmf}.mp4`,
		mimetype: "video/mp4", 
		caption:  nmf + ` ( ${quality} )

` + config.CAPTION
	})
	
await conn.sendMessage(from, { delete: up_mg.key })
	
await conn.sendMessage(from, { text : 'File Send Succesfull ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
await sleep(1000 * 1)

} else {

await conn.sendMessage(from, { text: msr.not_fo })
}
		
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(e)
}
})


cmd({
    pattern: "sinhimages",
    react: "📽",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, prefix, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const sudoNumber = config.SUDO;
	
  
	      var inp = ''
				var jidx = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}   


const input = inp ? inp : q
	

	if(input.includes("sinhalasub.lk/movies")) {
		
const anu = await fetchApi(`${apilink}/movie/sinhalasub/movie?url=${input}`)			
if (anu.result.data.images.length < 1) return await reply(not_fo)		
const jid = jidx ? jidx : from

for (let all of anu.result.data.images ){	     
await conn.sendMessage(jid ,  { image : { url : all } , caption: config.CAPTION })
}
	
await conn.sendMessage(from, { text : 'Details Card Sended ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
await sleep(1000 * 1) 
	
} else if ( input.includes("sinhalasub.lk/episode")) {

const anu = await fetchApi(`${apilink}/movie/sinhalasub/episode?url=${input}`)	
if (anu.result.data.images.length < 1) return await reply(not_fo)	
const jid = jidx ? jidx : from
		

for (let all of anu.result.data.images ){	     
await conn.sendMessage(jid ,  { image : { url : all } , caption: config.CAPTION })
}
	

await conn.sendMessage(from, { text : 'Details Card Sended ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
await sleep(1000 * 1) 	
}
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(e)
}
})
