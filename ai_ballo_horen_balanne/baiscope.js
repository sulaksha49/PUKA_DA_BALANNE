

const axios = require('axios');
const config = require('../config')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, fetchApi} = require('../lib/functions')
const baiscope = require('../lib/cinesubz')

const { storenumrepdata } = require('../lib/nonbutton')
function formatNumber(num) {
    return String(num).padStart(2, '0');
} 

var not_fo = "I can't find anyting"
var giveme = "Please give me movie or tv show name"


const apilink = baiscope.apilink
const apikey = baiscope.apikey




cmd({
    pattern: "baiscope",
    alias: ["sub","sisub","sb"],
    react: "🔠",
    desc: "Download for sinahala sub",
    category: "movie",
    use: '.subdl < Movie Name >',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const sudoNumber = config.SUDO;
	
  
if (!q) return await reply(giveme)
  
const mov = await fetchJson(`${apilink}/search/baiscope?text=${q}&apikey=${apikey}`)
var ty = ''

if (mov.result.data.length < 1) return await reply(not_fo)

let cot = `🔠 *𝖲𝖴𝖡𝖳𝖨𝖳𝖫𝖤 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 🔠


📲 Input: *${q}*

`
  
  let numrep = []              

   mov.result.data.forEach(( i, index ) => { 
                  cot += `*${formatNumber( index + 1)} ||* ${i.title}\n\n`
				
                  numrep.push(`${prefix}subjid ${i.url}` )
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
reply(`${e}`)
}
})

//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

cmd({
    pattern: "subjid",
    react: "✈",
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const sudoNumber = config.SUDO;
	

const mov = await fetchJson(`${apilink}/download/baiscope?url=${q}&apikey=${apikey}`)
	
 let cot = `🔠 *𝖲𝖴𝖡𝖳𝖨𝖳𝖫𝖤 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣 𝖲𝖸𝖲𝖳𝖤𝖬* 🔠


   📽️ Title: ${mov.result.title}

*${formatNumber(1)} ||* SEND INBOX       
`	

	
 let numrep = []
numrep.push(`${prefix}dlsub ${q}🎈${from}`)  	
	
for (let j = 0 ; j < config.JIDS.length; j++) {
     for (let i of config.JIDS[j].split(",") ){
                  cot += `*${formatNumber( j + 2)} ||* SEND JID: *${i}*\n`
				
                  numrep.push(`${prefix}dlsub ${q}🎈${i}` )
                
     }}



const mass = await conn.sendMessage(from, { text: `${cot}\n\n${config.FOOTER}`}, { quoted: mek });
	
          const jsonmsg = {
            key : mass.key,
            numrep,
            method : 'nondecimal'
           }

await storenumrepdata(jsonmsg) 
}catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})

//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

cmd({
    pattern: "dlsub",
    react: "⬆",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, msr, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, form, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const sudoNumber = config.SUDO;
	
	
if (!q) return reply("❗ *Please give baiscope url*")
    
  
        var typ = ''
				var jidx = ''
				var inp = ''	                
				var text = q
				if (q.includes('🎈')) jidx = text.split('🎈')[1]
				if (text.includes('🎈')) { inp = text.split('🎈')[0]}
	
if (!inp.includes('www.baiscope.lk')) return await reply(msr.valid_url) 
  
const mov = await fetchJson(`${apilink}/download/baiscope?url=${inp}&apikey=${apikey}`)
  

		
const jid = jidx || from
const img =  mov.result.image || ''
	
await conn.sendMessage(from, { image: { url: img }, caption: 
`➠ Title: ${mov.result.title}

➠ Download Link: ${mov.result.dl_link}


${config.CAPTION}`}, {quoted: mek});
  
	await conn.sendMessage( jid , { 
		document : await getBuffer(mov.result.dl_link) , 
		fileName: `${mov.result.title}.zip`, 
		mimetype: "application/zip", 
		caption:  `${mov.result.title}

` + config.CAPTION
	})
	
if (jidx === from) { 	
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } }) 
}	

else {
await conn.sendMessage(from, { text : 'File Send Succesfull ✔' }, { quoted: mek }) 
await conn.sendMessage(from, { react: { text: '✔', key: mek.key } })	
}

}catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})
