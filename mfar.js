const
	{
	    WAConnection: _WAConnection,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WAMessageProto,
		ReconnectMode,
		ProxyAgent,
		ChatModification,
		GroupSettingChange,
		WA_MESSAGE_STUB_TYPES,
		WA_DEAFULT_EPHEMERAL,
		waChatKey,
		mentionedJid,
		processTime,
		prepareMessageFromContent, 
		relayWAMessage
	} = require("@adiwajshing/baileys")
const fs = require("fs")
const hx = require('hxz-api')
const axios = require('axios')
const speed = require("performance-now")
const yts = require( 'yt-search')
const util = require('util')
const cheerio = require('cheerio')
const crypto = require('crypto')
const request = require('request')
const { exec, spawn } = require('child_process')
const fetch = require('node-fetch')
const moment = require('moment-timezone')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const { fetchJson, kyun, fetchText } = require('./lib/fetcher')
const { color, bgcolor } = require('./lib/color')
const { jadibot, stopjadibot, listjadibot } = require('./lib/jadibot')
const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, close } = require('./lib/functions')
const { EmojiAPI } = require("emoji-api")
const emoji = new EmojiAPI()

const setting = JSON.parse(fs.readFileSync('./config.json'))
const mess = JSON.parse(fs.readFileSync('./message/mess.js'))
const registered = JSON.parse(fs.readFileSync('./database/registered.json'))

const {
owner,
thumb,
faketeks,
ownerName,
botNumber,
botName
} = setting

banChats = false
publik = true

const Exif = require('./lib/exif')
const exif = new Exif()

const runtime = function (seconds) {
seconds = Number(seconds)
var d = Math.floor(seconds / (3600 * 24))
var h = Math.floor((seconds % (3600 * 24)) / 3600)
var m = Math.floor((seconds % 3600) / 60)
var s = Math.floor(seconds % 60)
var dDisplay = d > 0 ? d + (d == 1 ? " hari, " : " Hari, ") : ""
var hDisplay = h > 0 ? h + (h == 1 ? " jam, " : " Jam, ") : ""
var mDisplay = m > 0 ? m + (m == 1 ? " menit, " : " Menit, ") : ""
var sDisplay = s > 0 ? s + (s == 1 ? " detik" : " Detik") : ""
return dDisplay + hDisplay + mDisplay + sDisplay
}

module.exports = mfar = async (mfar, mek, _welkom) => {
        try {
        if (!mek.hasNewMessage) return
        mek = mek.messages.all()[0]
		if (!mek.message) return
		if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		global.blocked
        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        const content = JSON.stringify(mek.message)
		const from = mek.key.remoteJid
		const { text, extendedText, contact, contactsArray, groupInviteMessage, listMessage, buttonsMessage, location, liveLocation, image, video, sticker, document, audio, product, quotedMsg } = MessageType
		const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
		const wita = moment.tz('Asia/Makassar').format('HH:mm:ss')
		const wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
		const wit = moment.tz('Asia/Jayapura').format('HH:mm:ss')
        const type = Object.keys(mek.message)[0]        
        const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
        const prefix = /^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*@,;]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*,;]/gi) : '#'          	
        body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''
		budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()		
		const args = body.trim().split(/ +/).slice(1)		
		const isCmd = body.startsWith(prefix) 
		const arg = budy.slice(command.length + 2, budy.length)
		const q = args.join(' ')
		const Verived = "0@s.whatsapp.net"
		const txt = mek.message.conversation
		const botNumber = mfar.user.jid
		const ownerNumber = [`${owner}@s.whatsapp.net`, `6283871990243@s.whatsapp.net`]
		const isGroup = from.endsWith('@g.us')
		const sender = isGroup ? mek.participant : mek.key.remoteJid
		const senderr = mek.key.fromMe ? mfar.user.jid : mek.key.remoteJid.endsWith('@g.us') ? mek.participant : mek.key.remoteJid
		const totalchat = await mfar.chats.all()
		const groupMetadata = isGroup ? await mfar.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isOwner = ownerNumber.includes(sender)
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
		const conts = mek.key.fromMe ? mfar.user.jid : mfar.contacts[sender] || { notify: jid.replace(/@.+/, '') }
        const pushname = mek.key.fromMe ? mfar.user.name : conts.notify || conts.vname || conts.name || '-'
        try {
		pporang = await mfar.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
		} catch {
		pporang = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
	    }
		const ofrply = await getBuffer(pporang)
		const ml = fs.readFileSync('./image/ml.jpg')
		const epep = fs.readFileSync('./image/epep.jpg')
		const pubg = fs.readFileSync('./image/pubg.jpg')

const ftroli = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "16505434800@s.whatsapp.net" } : {})},message: {orderMessage: {itemCount : 2021,status: 1,surface : 1,message: `© 𝐗𝐫𝐮𝐭𝐳 - 𝐒𝐭𝐨𝐫𝐞 𝐁𝐨𝐭`,orderTitle: 'Xrutz',thumbnail: fs.readFileSync('./image/thumb.jpg'), sellerJid: '0@s.whatsapp.net'}}}
const ftoko = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "16505434800@s.whatsapp.net" } : {})},message: {"productMessage": {"product": {"productImage":{"mimetype": "image/jpeg","jpegThumbnail": fs.readFileSync(`./image/thumb.jpg`)},"title": `Hallo ${pushname}`,"description": "Xrutz Store", "currencyCode": "IDR","priceAmount1000": "9999999999","retailerId": "Xrutz Store","productImageCount": 1},"businessOwnerJid": `0@s.whatsapp.net`}}}
const fkontak = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? {remoteJid: "status@broadcast" } : {}) }, message: {contactMessage: {displayName: `© 𝐗𝐫𝐮𝐭𝐳 - 𝐒𝐭𝐨𝐫𝐞\nHallo User ${pushname}`, vcard: 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'N:Bot;Xrutz;Store;;\n' + 'FN: Xrutz - Official Store\n' + 'item1.TEL;waid=6283871990243:+6283871990243\n' + 'item1.X-ABLabel:Telepon\n' + 'END:VCARD'}}}
const fvid = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "6283871990243-1613049930@g.us" } : {}) },message: { "videoMessage": { "title": `Xrutz - Selfbot`,"h": `Hallo ${pushname}`,'duration': '99999', 'caption': `Hallo ${pushname}`,'jpegThumbnail': thumb}}}
const ftrol = { key : { fromMe: false, participant : '0@s.whatsapp.net', remoteJid: 'status@broadcast'}, message: {orderMessage: {itemCount : 9999, status: 1, surface : 1, message: `© 𝐗𝐫𝐮𝐭𝐳 - 𝐒𝐭𝐨𝐫𝐞 𝐁𝐨𝐭`, thumbnail: fs.readFileSync('./image/thumb.jpg'), sellerJid: '0@s.whatsapp.net'}}}
const floc = { key: { fromMe: false, participant : '0@s.whatsapp.net', remoteJid: 'status@broadcast'}, message: {locationMessage: {name: `𝐗𝐫𝐮𝐭𝐳 - 𝐒𝐭𝐨𝐫𝐞 𝐁𝐨𝐭`, jpegThumbnail: thumb}}}
const fakevo = { key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast'}, message: {imageMessage: {mimetype: 'image/jpeg', caption: 'Xrutz Selfbot', jpegThumbnail: fs.readFileSync('./image/thumb.jpg'), viewOnce: true}}}

const fakestatus = (teks) => {
mfar.sendMessage(from, teks, text, {
quoted: {
key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"imageMessage": {
"url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
"mimetype": "image/jpeg",
"caption": faketeks,
"fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
"fileLength": "28777",
"height": 1080,
"width": 1079,
"mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
"fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
"directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
"mediaKeyTimestamp": "1610993486",
"jpegThumbnail": thumb,
"scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
}
}
}, contextInfo: { "mentionedJid": [sender], "forwardingScore":999,"isForwarded":false},sendEphemeral: true
})
}

const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
}    
const reply = (teks) => {
mfar.sendMessage(from, teks, text, {thumbnail: ofrply, sendEphemeral: true, quoted: mek, contextInfo: { forwardingScore: 508, isForwarded: false, externalAdReply:{title:`© 𝐗𝐫𝐮𝐭𝐳 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥`, body: "", previewType: "PHOTO", thumbnail:ofrply, sourceUrl:`https://www.youtube.com/channel/UCJD2Gm2ixGvjkQcNJzx1ifA`}}})
}     
const sendMess = (hehe, teks) => {
mfar.sendMessage(hehe, teks, text)
}
const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? mfar.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : mfar.sendMessage(from, teks.trim(), extendedText, { quoted: ftrol, contextInfo: { "mentionedJid": memberr } })
}       
const costum = (pesan, tipe, target, target2) => {
mfar.sendMessage(from, pesan, tipe, { quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` } } })
}

const getRegisteredRandomId = () => {
return registered[Math.floor(Math.random() * registered.length)].id
}
const addRegisteredUser = (userid, sender, age, time, serials) => {
const obj = { id: userid, name: sender, age: age, time: time, serial: serials }
registered.push(obj)
fs.writeFileSync('./database/registered.json', JSON.stringify(registered))
}
const checkRegisteredUser = (sender) => {
let status = false
Object.keys(registered).forEach((i) => {
if (registered[i].id === sender) {
status = true
}
})
return status
}

const isRegistered = checkRegisteredUser(sender)

const sendButRegis = (id, text1, desc1, but = [], options = {}) => {
const buttonMessage = {
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 1,
};
mfar.sendMessage(
id,
buttonMessage,
MessageType.buttonsMessage,
options
);
};

const daftar1 = `𝗞𝗮𝗺𝘂 𝗕𝗲𝗹𝘂𝗺 𝗧𝗲𝗿𝗱𝗮𝗳𝘁𝗮𝗿!
𝐊𝐥𝐢𝐤 𝐁𝐮𝐭𝐭𝐨𝐧 𝐔𝐧𝐭𝐮𝐤 𝐌𝐞𝐧𝐝𝐚𝐟𝐭𝐚𝐫!`
const daftar2 = 'Mendaftar Cuma Bisa Sekali!'
const daftar3 = [{buttonId: `${prefix}verify`, buttonText: {displayText: `𝗠𝗲𝗻𝗱𝗮𝗳𝘁𝗮𝗿`,},type: 1,},]

const createSerial = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}

const sendButton = async (from, context, fortext, but, mek) => {
buttonMessages = {
contentText: context,
footerText: fortext,
buttons: but,
headerType: 1
}
mfar.sendMessage(from, buttonMessages, buttonsMessage, {
quoted: ftrol
})
}

const sendButDocument = async(id, text1, desc1, file1, doc1, but = [], options = {}) => {
media = file1
kma = doc1
mhan = await mfar.prepareMessage(from, media, document, kma)
const buttonMessages = {
documentMessage: mhan.message.documentMessage,
contentText: text1,
footerText: desc1,
buttons: but,
headerType: "DOCUMENT"
}
mfar.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
}

const sendButImage = async (from, context, fortext, img, but, mek) => {
jadinya = await mfar.prepareMessage(from, img, image)
buttonMessagesI = {
imageMessage: jadinya.message.imageMessage,
contentText: context,
footerText: fortext,
buttons: but,
headerType: 4
}
mfar.sendMessage(from, buttonMessagesI, buttonsMessage, {
quoted: fkontak,
contexInfo: adyt
})
}
        
const adyt = { 
"title": `Hallo ${pushname}`,
"body": `Xrutz`, 
"mediaType": "2", 
"mediaUrl": "https://youtu.be/ilrhJV_QMIE", 
"thumbnail": fs.readFileSync('./image/thumb.jpg')
}
   
const sendButLocation = async (id, text1, desc1, gam1, but = [], options = {}) => {
kma = gam1
mhan = await mfar.prepareMessage(from, kma, location)
const buttonMessages = {
locationMessage: mhan.message.locationMessage,
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 6
}
mfar.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
}
        
const sleep = async (ms) => {
return new Promise(resolve => setTimeout(resolve, ms));
}

const sendWebp = async(from, url) => {
var names = Date.now() / 10000;
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, './temp' + names + '.png', async function () {
console.log('selesai');
let ajg = './temp' + names + '.png'
let palak = './temp' + names + '.webp'
exec(`ffmpeg -i ${ajg} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${palak}`, (err) => {
let media = fs.readFileSync(palak)
mfar.sendMessage(from, media, MessageType.sticker,{quoted:mek})
fs.unlinkSync(ajg)
fs.unlinkSync(palak)
});
});
}

const sendStickerFromUrl = async(to, url) => {
var names = Date.now() / 10000;
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, './stik' + names + '.png', async function () {
console.log('selesai');
let filess = './stik' + names + '.png'
let asw = './stik' + names + '.webp'
exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
let media = fs.readFileSync(asw)
mfar.sendMessage(to, media, MessageType.sticker,{quoted:mek})
fs.unlinkSync(filess)
fs.unlinkSync(asw)
});
});
}

const sendKontak = (from, nomor, nama) => {
const vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + nama + '\n' + `ORG:Arell Ganz\n` + 'TEL;type=CELL;type=VOICE;waid=' + nomor + ':+' + nomor + '\n' + 'END:VCARD'
mfar.sendMessage(from, { disname: nama, vcard: vcard}, MessageType.contact, {quoted:mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
}

const sendMediaURL = async(to, url, text="", mids=[]) =>{
if(mids.length > 0){
text = normalizeMention(to, text, mids)
}
const fn = Date.now() / 10000;
const filename = fn.toString()
let mime = ""
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
mime = res.headers['content-type']
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, filename, async function () {
console.log('done');
let media = fs.readFileSync(filename)
let type = mime.split("/")[0]+"Message"
if(mime === "image/gif"){
type = MessageType.video
mime = Mimetype.gif
}
if(mime.split("/")[0] === "audio"){
mime = Mimetype.mp4Audio
}
mfar.sendMessage(to, media, type, { quoted: ftrol, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
    
fs.unlinkSync(filename)
});
}   

const getpc = async function(totalchat){
let pc = []
let a = []
let b = []
for (c of totalchat){
a.push(c.jid)
}
   for (d of a){
   if (d && !d.includes('g.us')){
   b.push(d)
   }
}
return b
}

const getGroup = async function(totalchat){
let grup = []
let a = []
let b = []
for (c of totalchat){
a.push(c.jid)
}
   for (d of a){
   if (d && d.includes('g.us')){
   b.push(d)
   }
}
   for (e of b){
   let ingfo = await mfar.groupMetadata(e)
   grup.push(ingfo)
   }
return grup
}  

let ii = []
let giid = []
for (mem of totalchat){
ii.push(mem.jid)
}
for (id of ii){
if (id && id.includes('g.us')){
giid.push(id)
}
}

const timestampi = speed();
const latensii = speed() - timestampi
const latensiii = `${latensii.toFixed(4)} _Second_`
const ini_gcchat = `${giid.length}`
const ini_totalchat = `${totalchat.length - giid.lenght}`

var ase = new Date();
var jamss = ase.getHours();
switch(jamss){
case 0: jamss = "Selamat Malam"; break;
case 1: jamss = "Selamat Malam"; break;
case 2: jamss = "Selamat Malam"; break;
case 3: jamss = "Selamat Malam"; break;
case 4: jamss = "Selamat Malam"; break;
case 5: jamss = "Sholat Subuh"; break;
case 6: jamss = "Selamat Pagi"; break;
case 7: jamss = "Selamat Pagi"; break;
case 8: jamss = "Selamat Pagi"; break;
case 9: jamss = "Selamat Pagi"; break;
case 10: jamss = "Selamat Pagi"; break;
case 11: jamss = "Selamat Sore"; break;
case 12: jamss = "Sholat Zuhur"; break;
case 13: jamss = "Selamat Sore"; break;
case 14: jamss = "Selamat Sore"; break;
case 15: jamss = "Sholat Ashar"; break;
case 16: jamss = "Selamat Sore"; break;
case 17: jamss = "Selamat Petang"; break;
case 18: jamss = "Sholat Maghrib"; break;
case 19: jamss = "Sholat Isha"; break;
case 20: jamss = "Selamat Malam"; break;
case 21: jamss = "Selamat Malam"; break;
case 22: jamss = "Selamat Malam"; break;
case 23: jamss = "Selamat Malam"; break;
}
var tampilUcapan = "" + jamss;
const jmn = moment.tz('Asia/Jakarta').format('HH:mm:ss')
let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
const weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
const week = d.toLocaleDateString(locale, { weekday: 'long' })
const calender = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long'
})

const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
if(time2 < "23:59:00"){
var ucapanWaktu = 'Good Night'
}
if(time2 < "19:00:00"){
var ucapanWaktu = 'Good Night'
}
if(time2 < "18:00:00"){
var ucapanWaktu = 'Good Afternoon'
}
if(time2 < "15:00:00"){
var ucapanWaktu = 'Good Afternoon'
}
if(time2 < "11:00:00"){
var ucapanWaktu = 'Good Morning'
}
if(time2 < "05:00:00"){
var ucapanWaktu = 'Good Morning'
}

colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
if (!publik) {
if (!isOwner && !mek.key.fromMe) return
}

if (isCmd && !isGroup) {console.log(color('|CMD|', 'cyan'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'orange'), color(`${command} [${args.length}]`, 'cyan'), color(`${pushname}`), color(`${sender}`))}
if (!command) {console.log(color('|MSG|', 'cyan'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'orange'), color(cmd), color(`${pushname}`, 'cyan'), color(`${sender}`))}

function clockString(ms) { //by Vall
let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}

let settingstatus = 0; // 𝗕𝘆 𝗩𝗮𝗹𝗹
if (new Date() * 1 - settingstatus > 1000) {
let _uptime = process.uptime() * 1000;
let uptime = clockString(_uptime);

await mfar.setStatus(`𝐒𝐭𝐚𝐭𝐮𝐬 𝐀𝐜𝐭𝐢𝐯𝐞 : ${uptime}`).catch((_) => _);
settingstatus = new Date() * 1;
}
if (!mek.key.fromMe && banChats === true) return;

switch (command) {
case 'verify': //By Denpa
if (isRegistered) return reply('Kamu sudah daftar...')
const serialUser = createSerial(18)
veri = sender
registered.push(sender)
fs.writeFileSync('./database/registered.json', JSON.stringify(registered))
addRegisteredUser(sender, serialUser)
const jancok = `𝗞𝗮𝗺𝘂 𝗦𝘂𝗱𝗮𝗵 𝗗𝗮𝗳𝘁𝗮𝗿!
𝐒𝐭𝐚𝐭𝐮𝐬 𝐔𝐬𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 :

*𝗡𝗮𝗺𝗲 :* ${pushname}
*𝗡𝘂𝗺𝗯𝗲𝗿 :* @${sender.split('@')[0]}
*𝗦𝗲𝗿𝗶𝗮𝗹 :* ${serialUser}
*𝗣𝗲𝗻𝗴𝗴𝘂𝗻𝗮 :* ${registered.length}

𝗠𝗮𝗸𝗮𝘀𝗶𝗵 𝗦𝘂𝗱𝗮𝗵 𝗠𝗲𝗻𝗱𝗮𝗳𝘁𝗮𝗿!
𝐔𝐬𝐞𝐫 𝐈𝐧𝐟𝐨 𝐒𝐮𝐝𝐚𝐡 𝐓𝐞𝐫𝐜𝐚𝐭𝐚𝐭 𝐝𝐢 𝐃𝐚𝐭𝐚𝐛𝐚𝐬𝐞 𝐗𝐫𝐮𝐭𝐳 𝐒𝐭𝐨𝐫𝐞`
gbutsan = [
{buttonId:`${prefix}menu`, buttonText: {displayText: '𝗠𝗲𝗻𝘂'}, type: 1},
{buttonId:`${prefix}storegame`, buttonText: {displayText: '𝗦𝗵𝗼𝗽 𝗚𝗮𝗺𝗲'}, type: 1}
]
mhan = await mfar.prepareMessage(from, ofrply, image, {thumbnail: ofrply})
const sendBtnVeryy = {
imageMessage: mhan.message.imageMessage,
contentText:`${jancok}`,
footerText:'Kamu sudah terdaftar di Database!', 
buttons: gbutsan,
headerType: 4
}
mfar.sendMessage(from, sendBtnVeryy, MessageType.buttonsMessage, {quoted: ftrol, contextInfo: { mentionedJid: [sender]}})
console.log(color('|VERIFY|', 'red'), color(time, 'yellow'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
break

case 'menu': case 'help':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})

menuu =`*Hallo User ${pushname}, ${tampilUcapan}*
*Saya Xrutz Store, Yang di Rancang Untuk*
Membantu Creatorku Berjualan Diamond!`
sendButLocation(from, `${menuu}`, "© Xrutz - Official Store", {jpegThumbnail:ofrply,name:""}, [{ buttonId: `${prefix}storegame`, buttonText: { displayText: '𝗦𝗵𝗼𝗽 𝗚𝗮𝗺𝗲' }, type: 1 }, { buttonId: `${prefix}menu2`, buttonText: { displayText: '𝗠𝗲𝗻𝘂 𝗜𝗻𝗳𝗼' }, type: 1 } ,{ buttonId: `${prefix}listmenu`, buttonText: { displayText: '𝗦𝗶𝗺𝗽𝗹𝗲 𝗠𝗲𝗻𝘂' }, type: 1 }], {contextInfo: { mentionedJid: [sender]}})
break

case 'owner':
let ini_list = []
for (let i of ownerNumber) {
const vname = mfar.contacts[i] != undefined ? mfar.contacts[i].vname || mfar.contacts[i].notify : undefined
ini_list.push({
"displayName": `Creator Xrutz`,
"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;${ownerName};;;\nFN:${vname ? `${vname}` : `${ownerName}`}\nitem1.TEL;waid=6283871990243:+62838719902432\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
})
}
mfar.sendMessage(from, {
"displayName": `Creator Xrutz`,
"contacts": ini_list 
}, 'contactsArrayMessage', { quoted: mek, contextInfo: { forwardingScore: 508, isForwarded: true }})
break

case 'menu2':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
thu = await mfar.getStatus(`${sender.split('@')[0]}@s.whatsapp.net`, MessageType.text)

smenu =`⦿ ────────────────── ⦿
╭─❏ ‣ 𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢
┤💌 Status : ${isOwner ? 'Developer' : 'Gratisan'}
┤✨ Bio : ${thu.status}
┤⚔️ Name : ${pushname}
└─❏

╭─❏ ‣ 𝗜𝗡𝗙𝗢 𝗕𝗢𝗧
┤💕 Name : ${botName}
┤💬 Mode : ${publik ? 'Public' : 'Self'}
┤🌍 Bahasa : Java Script
└─❏

╭─❏ ‣ 𝗧𝗜𝗠𝗘 𝗜𝗡𝗗𝗢
┤🕜 Wib : ${wib}
┤🕥 Wit : ${wit}
┤🕓 Wita : ${wita}
└─❏

╭─❏ ‣ 𝗜𝗡𝗙𝗢 𝗧𝗢𝗗𝗔𝗬
┤📰 Hari : ${week} ${weton}
┤📆 Date : ${calender}
┤🕰️ Waktu : ${jmn}
└─❏

╭─❏ ‣ 𝗟𝗜𝗦𝗧 𝗠𝗘𝗡𝗨
┤🌿 ${prefix}credits
┤💫 ${prefix}listmenu
┤🛍️ ${prefix}storegame
└─❏
⦿ ────────────────── ⦿
𝕵𝖆𝖓𝖌𝖆𝖓 𝖒𝖊𝖓𝖈𝖎𝖓𝖙𝖆𝖎 𝖘𝖊𝖘𝖊𝖔𝖗𝖆𝖓𝖌
𝖞𝖆𝖓𝖌 𝖇𝖊𝖑𝖚𝖒 𝖘𝖊𝖑𝖊𝖘𝖆𝖎 𝖉𝖊𝖓𝖌𝖆𝖓 𝕸𝖆𝖘𝖆
𝕷𝖆𝖑𝖚𝖓𝖞𝖆. 𝕸𝖊𝖓𝖉𝖎𝖓𝖌 𝖓𝖌𝖚𝖉𝖚𝖙 𝖇𝖗𝖔`
const btnmenu = [
{buttonId:`!000`,buttonText:{displayText:'𝗛𝗮𝗹𝗹𝗼 𝗞𝗮𝗸 𝗫𝗿𝘂𝘁𝘇\nAku Sudah Subscribe Channel Abang Xrutz Official, Sama Udah Like Kok'},type:1}
]
sendButDocument(from, `${smenu}`, "© Xrutz - Official Store", fs.readFileSync('./image/banner.jpg'), {mimetype:Mimetype.pdf, thumbnail:fs.readFileSync('./image/banner.jpg'), filename:`Xrutz - Official.pdf`, pageCount: 9999999 }, btnmenu, {quoted:fkontak, contextInfo: { mentionedJid: [stod], forwardingScore: 508, isForwarded: true, externalAdReply:{title:`${tampilUcapan} ${pushname}`,mediaType:"2",thumbnail:ofrply,mediaUrl:`https://youtu.be/kgnIpVs1Y9M`}}})
break

case 'storegame':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
listMsg = {
buttonText: 'LIST STORE',
footerText: 'Klik Button Untuk Selengkapnya!',
description: `𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿, 𝗦𝗮𝗹𝗮𝗺 𝗦𝗲𝗵𝗮𝘁!\n𝐒𝐢𝐥𝐚𝐡𝐤𝐚𝐧 𝐃𝐢𝐩𝐢𝐥𝐢𝐡 𝐋𝐢𝐬𝐭 𝐒𝐭𝐨𝐫𝐞 𝐆𝐚𝐦𝐞!`,
sections: [
{
"title": `${week}, ${calender}`,
 rows: [
{
"title": "Store Free Fire",
"description": "Xrutz - Official Store",
"rowId": "#storeff"
},

{
"title": "Mobile Legend",
"description": "Xrutz - Official Store",
"rowId": "#storeml"
},

{
"title": "Store Pubg Mobile",
"description": "Xrutz - Official Store",
"rowId": "#storepubg"
}                
]
}],
listType: 1
}
mfar.sendMessage(from, listMsg, MessageType.listMessage, {contextInfo: { mentionedJid: [sender]}, quoted: ftrol})
break

case 'storepubg':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
listMsg = {
buttonText: 'LIST HARGA',
description: `𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿, 𝗦𝗮𝗹𝗮𝗺 𝗦𝗲𝗵𝗮𝘁!\n*Silahkan Lihat List Harga Diamondnya!*\nDijamin Aman, Cepat, dan Murah`,
sections: [
{
"title": `${week}, ${calender}`,
 rows: [
{
"title": "62 💎 IDR 12.000",
"rowId": "#62💎"
},

{
"title": "122 💎 IDR 24.000",
"rowId": "#122💎"
},

{
"title": "156 💎 IDR 30.000",
"rowId": "#156💎"
},

{
"title": "186 💎 IDR 36.000",
"rowId": "#186💎"
},

{
"title": "263 💎 IDR 50.000",
"rowId": "#263💎"
},

{
"title": "525 💎 IDR 100.000",
"rowId": "#525💎"
},

{
"title": "1375 💎 IDR 250.000",
"rowId": "#1375💎"
},

{
"title": "Elite Pass",
"rowId": "#ep"
},

{
"title": "Royale Pass",
"rowId": "#rp"
}                
]
}],
listType: 1
}
mfar.sendMessage(from, listMsg, MessageType.listMessage, {contextInfo: { mentionedJid: [sender]}, quoted: ftrol})
break

case '62💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*62 💎 = IDR 12.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}payyy`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '122💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*122 💎 = IDR 24.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}payyy1`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '156💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*156 💎 = IDR 30.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}payyy2`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '186💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*186 💎 = IDR 36.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}payyy3`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '263💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*263 💎 = IDR 50.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}payyy4`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '525💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*525 💎 = IDR 100.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}payyy5`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '1375💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*1375 💎 = IDR 250.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}payyy6`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'ep':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*Elite Pass = IDR 90.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}payyy7`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'rp':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*Royale Pass = IDR 215.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}payyy8`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

// 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻
case 'payyy':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopyy`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'payyy1':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopyy1`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'payyy2':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopyy2`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'payyy3':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopyy3`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'payyy4':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopyy4`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'payyy5':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopyy5`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'payyy6':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopyy6`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'payyy7':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopyy7`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'payyy8':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopyy8`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopyy':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 62 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 12.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:pubg}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopyy1':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 122 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 24.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:pubg}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopyy2':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 156 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 30.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:pubg}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopyy3':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 186 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 36.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:pubg}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopyy4':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 263 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 50.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:pubg}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopyy5':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 525 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 100.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:pubg}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopyy6':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 1375 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 250.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:pubg}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopyy7':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : Elite Pass
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 90.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:pubg}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopyy8':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : Royale Pass
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 215.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:pubg}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

// 𝗦𝘁𝗼𝗿𝗲 𝗘𝗺𝗲𝗹
case 'storeml':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
listMsg = {
buttonText: 'LIST HARGA',
description: `𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿, 𝗦𝗮𝗹𝗮𝗺 𝗦𝗲𝗵𝗮𝘁!\n*Silahkan Lihat List Harga Diamondnya!*\nDijamin Aman, Cepat, dan Murah`,
sections: [
{
"title": `${week}, ${calender}`,
 rows: [
{
"title": "86 💎 IDR 25.000",
"rowId": "#86💎"
},

{
"title": "170 💎 IDR 50.000",
"rowId": "#170💎"
},

{
"title": "240 💎 IDR 72.000",
"rowId": "#240💎"
},

{
"title": "296 💎 IDR 88.000",
"rowId": "#296💎"
},

{
"title": "408 💎 IDR 121.000",
"rowId": "#408💎"
},

{
"title": "568 💎 IDR 165.000",
"rowId": "#568💎"
},

{
"title": "875 💎 IDR 255.000",
"rowId": "#875💎"
},

{
"title": "Starlight Member",
"rowId": "#sm"
},

{
"title": "Twilight Pass",
"rowId": "#tp"
}                
]
}],
listType: 1
}
mfar.sendMessage(from, listMsg, MessageType.listMessage, {contextInfo: { mentionedJid: [sender]}, quoted: ftrol})
break

case '86💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*86 💎 = IDR 25.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ml}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}payy`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '170💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*170 💎 = IDR 50.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ml}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}payy1`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '240💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*240 💎 = IDR 72.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ml}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}payy2`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '296💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*296 💎 = IDR 88.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ml}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}payy3`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '408💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*408 💎 = IDR 121.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ml}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}payy4`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '568💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*568 💎 = IDR 165.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ml}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}payy5`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '875💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*875 💎 = IDR 255.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ml}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}payy6`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'sm':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*Starlight Member = IDR 164.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ml}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}payy7`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'tp':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*Twilight Pass = IDR 167.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ml}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}payy8`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

// 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻
case 'payy':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopy`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'payy1':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopy1`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'payy2':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopy2`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'payy3':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopy3`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'payy4':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopy4`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'payy5':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopy5`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'payy6':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopy6`,buttonText:{displayText:'??𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'payy7':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopy7`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'payy8':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopy8`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopy':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 86 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 25.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:ml}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopy1':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 170 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 50.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:ml}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopy2':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 240 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 72.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:ml}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopy3':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 296 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 88.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:ml}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopy4':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 408 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 121.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:ml}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopy5':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 568 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 165.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:ml}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopy6':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 875 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 255.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:ml}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopy7':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : Starlight Member
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 164.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:ml}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopy8':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : Twilight Pass
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 167.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:ml}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

// 𝗡𝗴𝗲𝗽𝗻𝗴𝗲𝗽 𝗦𝘁𝗼𝗿𝗲
case 'storeff':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
listMsg = {
buttonText: 'LIST HARGA',
description: `𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿, 𝗦𝗮𝗹𝗮𝗺 𝗦𝗲𝗵𝗮𝘁!\n*Silahkan Lihat List Harga Diamondnya!*\nDijamin Aman, Cepat, dan Murah`,
sections: [
{
"title": `${week}, ${calender}`,
 rows: [
{
"title": "70 💎 IDR 10.000",
"rowId": "#70💎"
},

{
"title": "140 💎 IDR 20.000",
"rowId": "#140💎"
},

{
"title": "200 💎 IDR 30.000",
"rowId": "#200💎"
},

{
"title": "280 💎 IDR 40.000",
"rowId": "#280💎"
},

{
"title": "355 💎 IDR 50.000",
"rowId": "#355💎"
},

{
"title": "475 💎 IDR 65.000",
"rowId": "#475💎"
},

{
"title": "510 💎 IDR 70.000",
"rowId": "#510💎"
},

{
"title": "635 💎 IDR 85.000",
"rowId": "#635💎"
},

{
"title": "720 💎 IDR 100.000",
"rowId": "#720💎"
},

{
"title": "Member Mingguan",
"rowId": "#mm"
},

{
"title": "Member Bulanan",
"rowId": "#mb"
}                
]
}],
listType: 1
}
mfar.sendMessage(from, listMsg, MessageType.listMessage, {contextInfo: { mentionedJid: [sender]}, quoted: ftrol})
break

// 𝗗𝗶𝗮𝗺𝗼𝗻𝗱𝗡𝘆𝗲𝗱
case '70💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*70 💎 = IDR 10.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}pay`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '140💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*140 💎 = IDR 20.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}pay1`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '200💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*200 💎 = IDR 30.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}pay2`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '280💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*280 💎 = IDR 40.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}pay3`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '355💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*355 💎 = IDR 50.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}pay4`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '475💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*475 💎 = IDR 65.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}pay5`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '510💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*510 💎 = IDR 70.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}pay6`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '635💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*635 💎 = IDR 85.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}pay7`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case '720💎':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*720 💎 = IDR 100.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}pay8`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'mm':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*M. Mingguan = IDR 30.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}pay9`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'mb':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `*M. Bulanan = IDR 140.000*
Hallo ${pushname}, Mau Lanjut Transaksi?
Klik Back Untuk Kembali Awal!`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗕𝗮𝗰𝗸 𝗟𝗶𝘀𝘁'},type:1},{buttonId:`${prefix}pay10`,buttonText:{displayText:'𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

// 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻
case 'pay':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopay`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'pay1':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopay1`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶?? 𝗖??𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'pay2':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopay2`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'pay3':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopay3`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'pay4':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopay4`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'pay5':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopay5`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'pay6':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopay6`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'pay7':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopay7`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'pay8':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopay8`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'pay9':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopay9`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'pay10':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `Hallo ${pushname}, ${tampilUcapan}
*Silahkan Pilih Metode Pembayaran*
*Bisa Melalui Qris All Payment!*`
sendButLocation(from, `${menu}`, "*Xrutz - Official Store*", {jpegThumbnail:ofrply}, [{buttonId:`${prefix}gopay10`,buttonText:{displayText:'𝗚𝗼𝗽𝗮𝘆'},type:1},{buttonId:`${prefix}qris`,buttonText:{displayText:'𝗤𝗿𝗶𝘀 𝗖𝗼𝗱𝗲'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopay':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 70 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 10.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:epep}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopay1':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 140 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 20.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:epep}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopay2':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 200 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 30.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:epep}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopay3':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 280 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 40.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:epep}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopay4':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 355 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 50.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:epep}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopay5':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 475 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 65.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:epep}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopay6':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 510 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 70.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:epep}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopay7':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 635 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 85.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:epep}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopay8':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : 720 💎
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 100.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:epep}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopay9':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨𝘀𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : M. Mingguan
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 30.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:epep}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'gopay10':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
stod = `${sender}`
			
menu = `‣ 𝗛𝗮𝗹𝗹𝗼 𝗨𝘀𝗲𝗿 ${pushname}
𝗦𝘁𝗮𝘁𝘂𝘀 𝗣𝗲𝗺𝗯𝗮𝘆𝗮𝗿𝗮𝗻 :`

footer = `𝗡𝗮𝗺𝗲 : 𝗨??𝗲𝗿 ${pushname}
𝗡𝘂𝗺𝗯𝗲𝗿 : ${sender.split("@")[0]}
𝗡𝗼𝗺𝗶𝗻𝗮𝗹 : M. Bulanan
️𝗛𝗮𝗿𝗴𝗮 : 𝗥𝗽. 140.000

‣ 𝗫𝗿𝘂𝘁𝘇 𝗦𝘁𝗼𝗿𝗲 - ${jmn}
${week}, ${calender}`
sendButLocation(from, `${menu}`, `${footer}`, {jpegThumbnail:epep}, [{buttonId:'!000',buttonText:{displayText:'𝗞𝗶𝗿𝗶𝗺 𝗕𝘂𝗸𝘁𝗶 𝗞𝗲 𝗢𝘄𝗻𝗲𝗿'},type:1}], {contextInfo: { mentionedJid: [stod]}})
break

case 'qris':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
teks =`*${tampilUcapan} ${pushname}*
𝗦𝗶𝗹𝗮𝗵𝗸𝗮𝗻 𝗦𝗰𝗮𝗻 𝗤𝗿𝗶𝘀𝗻𝘆𝗮!`

img = fs.readFileSync('./image/qris.jpg')
but = [{ buttonId: `${prefix}owner`, buttonText: { displayText: '𝗖𝗵𝗮𝘁 𝗢𝘄𝗻𝗲𝗿' }, type: 1 }]
sendButImage(from, teks, `Kirim Bukti Screenshot Transfer\nKe Creator Bot, Klik Button nya!`, img, but)
break

//--------------------------[ 𝗠𝗲𝗻𝘂 𝗟𝗮𝗶𝗻𝗻𝘆𝗮 ]----------------------------\\
case 'credits':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
mkse =`=======[ 𝗕𝗜𝗚 𝗧𝗛𝗔𝗡𝗞𝗦 ]=======
( Adiwajshing, IWasHuman, Zeeone )`

footer =`- 𝖷𝗋𝗎𝗍𝗓 𝖮𝖿𝖿𝗂𝖼𝗂𝖺𝗅
- 𝖠𝖽𝗂𝗐𝖺𝗃𝗌𝗁𝗂𝗇𝗀 (𝖡𝖺𝗂𝗅𝖾𝗒𝗌)
- 𝖪𝗎𝗋𝗋𝖷𝖽
- 𝖹𝖾𝖾𝗈𝗇𝖾 𝖮𝖿𝖿𝖼
- 𝖣𝗁𝖺𝗇𝗂 𝖦𝖺𝗇𝗓
- 𝖵𝖺𝗅𝗅 𝖦𝖺𝗇𝗓
- 𝖱𝗂𝗆𝗎𝗋𝗎 𝖡𝗈𝗍𝗓
- 𝖠𝗋𝗂𝖿𝗂 𝖱𝖺𝗓𝗓𝖺𝗊 𝖮𝖿𝖿𝖼
- 𝖱𝖺𝗆𝗅𝖺𝗇 𝖨𝖣
- 𝖷𝗂𝗇𝗓 𝖳𝖾𝖺𝗆
- 𝖨𝖶𝖺𝗌𝖧𝗎𝗆𝖺𝗇
- 𝖯𝖾𝗇𝗒𝖾𝖽𝗂𝖺 𝖠𝗉𝗂𝗄𝖾𝗒
- 𝖢𝗋𝖾𝖺𝗍𝗈𝗋 𝖡𝗈𝗍`
sendButLocation(from, `${mkse}`, `${footer}`, {jpegThumbnail:ofrply}, [{buttonId:`${prefix}sc`,buttonText:{displayText:'𝗦𝗰𝗿𝗶𝗽𝘁 𝗢𝗿𝗶𝗴𝗶𝗻𝗮𝗹'},type:1}], {contextInfo: { mentionedJid: [sender]}})
break
// 𝗟𝘂 𝗛𝗮𝗽𝘂𝘀 𝗔𝘂𝘁𝗼 𝗩𝗶𝗺𝗿𝗮𝗹

case 'listmenu':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, {quoted : floc})
footer =`╭─❏ 𝗠𝗘𝗡𝗨 𝗚𝗥𝗨𝗣
┤‣ ${prefix}linkgrup
┤‣ ${prefix}leave
┤‣ ${prefix}setname
┤‣ ${prefix}setdesc
┤‣ ${prefix}setpp
┤‣ ${prefix}getpp
┤‣ ${prefix}listadmin
┤‣ ${prefix}listonline
┤‣ ${prefix}tagall
┤‣ ${prefix}hidetag
└─❏

╭─❏ 𝗦𝗧𝗜𝗖𝗞 𝗠𝗘𝗡𝗨
┤‣ ${prefix}setxif
┤‣ ${prefix}swm
┤‣ ${prefix}ttp
┤‣ ${prefix}attp
┤‣ ${prefix}semoji
┤‣ ${prefix}sticker
┤‣ ${prefix}toimg
└─❏

╭─❏ 𝗢𝗧𝗛𝗘𝗥 𝗠𝗘𝗡𝗨
┤‣ ${prefix}speed
┤‣ ${prefix}runtime
┤‣ ${prefix}sampah
┤‣ ${prefix}wasted
┤‣ ${prefix}trigger
┤‣ ${prefix}patrick
┤‣ ${prefix}stonk
┤‣ ${prefix}notstonk
┤‣ ${prefix}random
┤‣ ${prefix}hengker
┤‣ ${prefix}spongebob
┤‣ ${prefix}nulis
┤‣ ${prefix}rip
└─❏

╭─❏ 𝗨𝗡𝗗𝗨𝗛 𝗠𝗘𝗡𝗨
┤‣ ${prefix}play
┤‣ ${prefix}ytmp4
┤‣ ${prefix}tiktokmusic
┤‣ ${prefix}tiktoknowm
┤‣ ${prefix}pinterest
└─❏

╭─❏ 𝗦𝗢𝗨𝗡𝗗 𝗠𝗘𝗡𝗨
┤‣ ${prefix}sound1
┤‣ ${prefix}sound2
┤‣ ${prefix}sound3
┤‣ ${prefix}sound4
┤‣ ${prefix}sound5
┤‣ ${prefix}sound6
┤‣ ${prefix}sound7
┤‣ ${prefix}sound8
┤‣ ${prefix}sound9
┤‣ ${prefix}sound10
┤‣ ${prefix}sound11
┤‣ ${prefix}sound12
┤‣ ${prefix}sound13
┤‣ ${prefix}sound14
┤‣ ${prefix}sound15
└─❏

╭─❏ 𝗢𝗪𝗡𝗘𝗥 𝗠𝗘𝗡𝗨
┤‣ ${prefix}broadcast
┤‣ ${prefix}mode
┤‣ ${prefix}public
┤‣ ${prefix}self
┤‣ ${prefix}report
┤‣ ${prefix}shutdown
┤‣ ${prefix}setppbot
┤‣ ${prefix}jadibot
┤‣ ${prefix}stopjadibot
┤‣ ${prefix}listbot
└─❏

© 𝙓𝙧𝙪𝙩𝙯 - 𝘽𝙤𝙩 𝙎𝙩𝙤𝙧𝙚`

lstmn =`❏ 𝗜𝗡𝗙𝗢 𝗕𝗢𝗧
𝖭𝖺𝗆𝖾 : ${botName}
𝖨𝗇𝖿𝗈 𝖬𝗈𝖽𝖾 : ${publik ? 'Public' : 'Self'}
𝖯𝗋𝖾𝖿𝗂𝗑 𝖳𝗒𝗉𝖾 : Multi Prefix
𝖣𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 : ${ownerName}`
sendButLocation(from, `${lstmn}`, `${footer}`, {jpegThumbnail:ofrply}, [{buttonId:`${prefix}owner`,buttonText:{displayText:'𝗖𝗿𝗲𝗮𝘁𝗼𝗿'},type:1}, {buttonId:`${prefix}storegame`,buttonText:{displayText:'𝗦𝘁𝗼𝗿𝗲 𝗚𝗮𝗺𝗲'},type:1}], {contextInfo: { mentionedJid: [sender]}})
break

// 𝗠𝗲𝗻𝘂 𝗦𝗼𝘂𝗻𝗱
case 'sound1':
case 'sound2':
case 'sound3':
case 'sound4':
case 'sound5':
case 'sound6':
case 'sound7':
case 'sound8':
case 'sound9':
case 'sound10':
case 'sound11':
case 'sound12':
case 'sound13':
case 'sound14':
case 'sound15':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
omkeh = await getBuffer(`https://hansxd.nasihosting.com/sound/${command}.mp3`)
mfar.sendMessage(from, omkeh, MessageType.audio, { quoted: mek, mimetype: 'audio/mp4', ptt: true })
break

// 𝗠𝗲𝗻𝘂 𝗚𝗿𝗼𝘂𝗽
case 'infogc':
case 'infogroup':
if (!isGroup) return reply(mess.only.group)
try {
var pic = await mfar.getProfilePicture(from)
} catch {
var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
}
let ingfo = `*=== 𝗜𝗡𝗙𝗢 𝗚𝗥𝗢𝗨𝗣 ===*\n\n*𝖭𝖺𝗆𝖾 :* ${groupName}\n*𝖦𝗋𝗈𝗎𝗉 𝖨𝖣 :* ${from}\n*𝖣𝗂𝖻𝗎𝖺𝗍 :* ${moment(`${groupMetadata.creation}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n*𝖯𝖾𝗆𝖻𝗎𝖺𝗍 :* @${groupMetadata.owner.split('@')[0]}\n*𝖳𝗈𝗍𝖺𝗅 𝖠𝖽𝗆𝗂𝗇 :* ${groupAdmins.length}\n*𝖳𝗈𝗍𝖺𝗅 𝖯𝖾𝗌𝖾𝗋𝗍𝖺 :* ${groupMembers.length}\n*𝖣𝖾𝗌𝗄𝗋𝗂𝗉𝗌𝗂 :* \n${groupMetadata.desc}\n© 𝙓𝙧𝙪𝙩𝙯 𝙊𝙛𝙛𝙞𝙘𝙞𝙖𝙡`
mfar.sendMessage(from, await getBuffer(pic), image, {quoted: ftrol, caption: ingfo, contextInfo: {"mentionedJid": [groupMetadata.owner.replace('@c.us', '@s.whatsapp.net')]}})
break

case 'linkgc':
case 'linkgrup':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if (!isGroup) return reply(mess.only.group)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
linkgc = await mfar.groupInviteCode(from)
yeh = `https://chat.whatsapp.com/${linkgc}\n\n*Link Group :* ${groupName}`
mfar.sendMessage(from, yeh, text, { quoted: ftrol })
break

case 'leave':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
setTimeout( () => {
mfar.groupLeave(from) 
}, 2000)
setTimeout( () => {
reply('*Makasih Sudah Mengundang...*\n*Izin Keluar, Karna di Suruh :)*')
}, 0)
break

case 'setname':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
mfar.groupUpdateSubject(from, `${body.slice(9)}`)
mfar.sendMessage(from, `Perubahan Terjadi : *${body.slice(9)}*`, text, { quoted: ftrol })
break

case 'setdesc':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
mfar.groupUpdateDescription(from, `${body.slice(9)}`)
mfar.sendMessage(from, `Perubahan Menjadi :\n*${body.slice(9)}*`, text, { quoted: ftrol })
break

case 'setpp':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
media = await mfar.downloadAndSaveMediaMessage(mek, './database/media_user')
await mfar.updateProfilePicture(from, media)
reply(mess.wait)
reply(mess.success)
break

case 'getpp':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if (!isGroup) return reply(mess.only.group)
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
pictt = await mfar.getProfilePicture(mentioned)
pict = await getBuffer(pictt)
mfar.sendMessage(from, pict, image, {quoted: mek})
break

case 'listadmin':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if (!isGroup) return reply(mess.only.group)
teks = ``
no = 0
for (let admon of groupAdmins) {
no += 1
teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
}
mentions(teks, groupAdmins, true)
break

case 'listonline':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if (!isGroup) return reply(mess.only.group)
try {
let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
let online = [...Object.keys(mfar.chats.get(ido).presences), mfar.user.jid]
mfar.sendMessage(from, '*Online People :*\n' + online.map(v => '➛ @' + v.replace(/@.+/, '')).join `\n`, text, { quoted: mek, contextInfo: { mentionedJid: online }})
} catch (e) {
reply(`${e}`)
}

case 'hidetag':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
var value = body.slice(9)
var group = await mfar.groupMetadata(from)
var member = group['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var options = {
text: value,
contextInfo: { mentionedJid: mem },
quoted: ftrol
}
mfar.sendMessage(from, options, text)
break

case 'tagall':
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isGroup) return reply(mess.only.group)
members_id = []
teks = (args.length > 1) ? body.slice(8).trim() : ''
teks += '*Kena Tag Wkwk*\n'
for (let mem of groupMembers) {
teks += `@${mem.jid.split('@')[0]}\n`
members_id.push(mem.jid)
}
mentions(teks, members_id, true)
break

// 𝗦𝘁𝗶𝗰𝗸𝗲𝗿 𝗠𝗲𝗻𝘂
case 'exif':
case 'setexif':
if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
if (args.length == 0) return reply(`Example : ${prefix + command} Xrutz|Official`)
const exifff = `${args.join(' ')}`
const namaPack = exifff.split('|')[0]
const authorPack = exifff.split('|')[1]
exif.create(namaPack, authorPack)
await reply(mess.success)
break

case 'swm':
case 'stickwm':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if (isMedia && !mek.message.videoMessage || isQuotedImage) {
ppp = `${args.join(' ')}`
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
const media = await mfar.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
const packname1 = ppp.split('|')[0]
const author1 = ppp.split('|')[1]
exif.create(packname1, author1, `stickwm_${sender}`)
await ffmpeg(`${media}`)
.input(media)
.on('start', function (cmd) {
console.log(`Started : ${cmd}`)
})
.on('error', function (err) {
console.log(`Error : ${err}`)
fs.unlinkSync(media)
reply(mess.error.api)
})
.on('end', function () {
console.log('Finish')
exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
if (error) return reply(mess.error.api)
mfar.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: mek})
fs.unlinkSync(media)	
fs.unlinkSync(`./sticker/${sender}.webp`)	
fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
})
})
.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(`./sticker/${sender}.webp`)
} else if ((isMedia && mek.message.videoMessage.fileLength < 10000000 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
wmsti = body.slice(11)
if (!wmsti.includes('|')) return reply(`Kirim gambar atau reply gambar dengan caption *${prefix}stickerwm nama|author*`)
const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
const media = await mfar.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
const packname1 = wmsti.split('|')[0]
const author1 = wmsti.split('|')[1]
exif.create(packname1, author1, `stickwm_${sender}`)
reply(mess.wait)
await ffmpeg(`${media}`)
.inputFormat(media.split('.')[4])
.on('start', function (cmd) {
console.log(`Started : ${cmd}`)
})
.on('error', function (err) {
console.log(`Error : ${err}`)
fs.unlinkSync(media)
tipe = media.endsWith('.mp4') ? 'video' : 'gif'
reply(mess.error.api)
})
.on('end', function () {
console.log('Finish')
exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
if (error) return reply(mess.error.api)
mfar.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: mek})
fs.unlinkSync(media)
fs.unlinkSync(`./sticker/${sender}.webp`)
fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
})
})
.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(`./sticker/${sender}.webp`)
} else {
reply(`Kirim gambar/video dengan caption ${prefix}stickerwm nama|author atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
}
break

case 's':
case 'sticker':
case 'stiker':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if (isMedia && !mek.message.videoMessage || isQuotedImage) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
const media = await mfar.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
await ffmpeg(`${media}`)
.input(media)
.on('start', function (cmd) {
console.log(`「❗」Started : ${cmd}`)
})
.on('error', function (err) {
console.log(`「❗」Error : ${err}`)
fs.unlinkSync(media)
reply(mess.error.api)
})
.on('end', function () {
console.log('「❗」Finish')
exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
if (error) return reply(mess.error.api)
mfar.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: mek})
fs.unlinkSync(media)	
fs.unlinkSync(`./sticker/${sender}.webp`)	
})
})
.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(`./sticker/${sender}.webp`)
} else if ((isMedia && mek.message.videoMessage.fileLength < 10000000 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
const media = await mfar.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
reply(mess.wait)
await ffmpeg(`${media}`)
.inputFormat(media.split('.')[4])
.on('start', function (cmd) {
console.log(`「❗」Started : ${cmd}`)
})
.on('error', function (err) {
console.log(`「❗」Error : ${err}`)
fs.unlinkSync(media)
tipe = media.endsWith('.mp4') ? 'video' : 'gif'
reply(mess.error.api)
})
.on('end', function () {
console.log('「❗」Finish')
exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
if (error) return reply(mess.error.api)
mfar.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: mek})
fs.unlinkSync(media)
fs.unlinkSync(`./sticker/${sender}.webp`)
})
})
.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save(`./sticker/${sender}.webp`)
} else {
reply(`Kirim gambar/video dengan caption ${prefix}sticker atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
}
break

case 'semoji':
 if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if (args === 0) return reply('Emojinya?')   
aku4 = args.join(' ')
emoji.get(`${aku4}`).then(emoji => {
link = `${emoji.images[10].url}`
sendWebp(from, `${link}`).catch(() => reply('Gagal'))
})
break

case 'ttp':  
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if (!q) return reply(`Contoh : ${prefix}ttp Xrutz`)
tetepe = await getBuffer(`https://api.lolhuman.xyz/api/ttp?apikey=KurrXd&text=${encodeURIComponent(q)}`)
mfar.sendMessage(from, tetepe, sticker, { quoted: mek })
break

case 'attp':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if (args.length == 0) return reply(`Example: ${prefix + command} Xrutz`)
buffer = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURI(q)}`)
mfar.sendMessage(from, buffer, sticker, { quoted: mek })
break
              
case 'toimg':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if (!isQuotedSticker) return reply('*Reply Stickernya!*')
encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
media = await mfar.downloadAndSaveMediaMessage(encmedia, './database/media_user')
ran = getRandom('.png')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) return reply('*Gagal Pada Saat Mengkonversi Sticker*')
buffer = fs.readFileSync(ran)
costum(buffer, image, Verived, `𝐒𝐮𝐛𝐬𝐜𝐫𝐢𝐛𝐞 Xrutz Official!`)
fs.unlinkSync(ran)
})
break

// 𝗢𝘁𝗵𝗲𝗿 𝗠𝗲𝗻𝘂
case 'speed':
case 'runtime':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
const timestampi = speed();
const latensyi = speed() - timestampi
run = process.uptime()
fakestatus(`*𝐒𝐩𝐞𝐞𝐝 𝐁𝐨𝐭𝐳 : ${latensyi.toFixed(4)} 𝐃𝐞𝐭𝐢𝐤*\n*Runtime Botz : ${kyun(run)} Detik*`)
break

case 'nulis':
if (args.length < 1) return reply('Teksnya?')
teks = args.join(' ')
reply(mess.wait)
nulis = encodeURIComponent(teks)
res = await axios.get(`https://dt-04.herokuapp.com/nulis?text=${nulis}`)
if (res.data.error) return fakestatus(res.data.error)
buff = Buffer.from(res.data.result.split(',')[1], 'base64')
mfar.sendMessage(from, buff, image, {quoted: mek, caption: "*Hati Hati Ketahuan!*"}).catch(e => {
return reply(mess.error.api)
})
break

case 'sampah':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
var imgbb = require('imgbb-uploader')
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
reply(mess.wait)
owgi = await mfar.downloadAndSaveMediaMessage(ger)
let aanu = await imgbb("55e7971b786836b9966eca4528210ba8", owgi)
let teks = `${aanu.display_url}`
titid = await fetchJson(`https://nekobot.xyz/api/imagegen?type=trash&url=${teks}`, {method: 'get'})
buffer = await getBuffer(titid.message)
mfar.sendMessage(from, buffer, image, {quoted: mek})
}
break

case 'wasted':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
var imgbb = require('imgbb-uploader')
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek 
reply(mess.wait)
owgi = await  mfar.downloadAndSaveMediaMessage(ger)
anu = await imgbb("0ffc503f79f9b051b82e643eb3e3a746", owgi)
teks = `${anu.display_url}`
ranp = getRandom('.gif')
rano = getRandom('.webp')
anu2 = `https://some-random-api.ml/canvas/wasted?avatar=${teks}`
exec(`wget ${anu2} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
fs.unlinkSync(ranp)
if (err) return reply(mess.error.stick)
mfar.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
fs.unlinkSync(rano)
})
					
} else {
reply('*Reply Image!*')
}
break

case 'trigger':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
var imgbb = require('imgbb-uploader')
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek 
reply(mess.wait)
console.log(color(time, 'magenta'), color('Downloading Sticker...'))
owgi = await mfar.downloadAndSaveMediaMessage(ger)
anu = await imgbb("0ffc503f79f9b051b82e643eb3e3a746", owgi)
teks = `${anu.display_url}`
ranp = getRandom('.gif')
rano = getRandom('.webp')
anu1 = `https://some-random-api.ml/canvas/triggered?avatar=${teks}`
exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
fs.unlinkSync(ranp)
if (err) return reply(mess.error.stick)
mfar.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
fs.unlinkSync(rano)
})
} else {
reply('*Reply Imagenya!*')
}
break

case 'patrick':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
var imgbb = require('imgbb-uploader')
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
reply(mess.wait)
owgi = await mfar.downloadAndSaveMediaMessage(ted)
tels = body.slice(7)
anu = await imgbb("520bd6f6209077d1777c2a4f20c509c2", owgi)
hehe = await getBuffer(`https://hardianto-chan.herokuapp.com/api/knights/patrick?apikey=hardianto&pp=${anu.display_url}`)
mfar.sendMessage(from, hehe, image, {quoted:mek})
} else {
reply('*Reply Imagenya!*')
}
break

case 'random':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
reply(mess.wait)
kau = (`https://hardianto-chan.herokuapp.com/api/asupan?apikey=hardianto`)
kon = await getBuffer(kau)
mfar.sendMessage(from, kon, video, { quoted: mek, thumbnail: fs.readFileSync('./image/thumb.jpg')})
break

case 'spongebob':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
var imgbb = require('imgbb-uploader')
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
reply(mess.wait)
owgi = await mfar.downloadAndSaveMediaMessage(ted)
tels = body.slice(7)
anu = await imgbb("520bd6f6209077d1777c2a4f20c509c2", owgi)
hehe = await getBuffer(`https://hardianto-chan.herokuapp.com/api/knights/spongebob?apikey=hardianto&pp=${anu.display_url}`)
mfar.sendMessage(from, hehe, image, {quoted:mek})
} else {
reply('*Reply Imagenya!*')
}
break

case 'hengker':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
var imgbb = require('imgbb-uploader')
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
reply(mess.wait)
owgi = await mfar.downloadAndSaveMediaMessage(ted)
tels = body.slice(7)
anu = await imgbb("520bd6f6209077d1777c2a4f20c509c2", owgi)
hehe = await getBuffer(`https://hardianto-chan.herokuapp.com/api/beta/hacker3?apikey=hardianto&pp=${anu.display_url}`)
mfar.sendMessage(from, hehe, image, {quoted:mek})
} else {
reply('*Reply Imagenya!*')
}
break

case 'rip':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
var imgbb = require('imgbb-uploader')
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
reply(mess.wait)
owgi = await mfar.downloadAndSaveMediaMessage(ted)
tels = body.slice(7)
anu = await imgbb("520bd6f6209077d1777c2a4f20c509c2", owgi)
hehe = await getBuffer(`https://hardianto-chan.herokuapp.com/api/rip?image=${anu.display_url}&apikey=hardianto`)
mfar.sendMessage(from, hehe, image, {quoted:mek})
} else {
reply('*Reply Imagenya!*')
}
break

case 'stonk':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
var imgbb = require('imgbb-uploader')
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
reply(mess.wait)
owgi = await mfar.downloadAndSaveMediaMessage(ted)
tels = body.slice(7)
anu = await imgbb("520bd6f6209077d1777c2a4f20c509c2", owgi)
hehe = await getBuffer(`https://hardianto-chan.herokuapp.com/api/stonk?image=${anu.display_url}&apikey=hardianto`)
 mfar.sendMessage(from, hehe, image, {quoted:mek})
} else {
reply('*Reply Imagenya!*')
}
break

case 'notstonk':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
var imgbb = require('imgbb-uploader')
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
reply(mess.wait)
owgi = await mfar.downloadAndSaveMediaMessage(ted)
tels = body.slice(7)
anu = await imgbb("520bd6f6209077d1777c2a4f20c509c2", owgi)
hehe = await getBuffer(`https://hardianto-chan.herokuapp.com/api/not-stonk?image=${anu.display_url}&apikey=hardianto`)
mfar.sendMessage(from, hehe, image, {quoted:mek})
} else {
reply('*Reply Imagenya!*')
}
break

// 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗿
case 'play': //by Denpa
if (args.length == 0) return reply(`Example: ${prefix + command} vide 1detik`)
query = args.join(" ")
get_resultL = await fetchJson(`https://ziy.herokuapp.com/api/play?apikey=xZiyy&judul=${query}`)
get_resultP = get_resultL.result
textP =`‣ 𝗣𝗹𝗮𝘆 𝗬𝗼𝘂𝘁𝘂𝗯𝗲
𝗫𝗿𝘂𝘁𝘇 - 𝗢𝗳𝗳𝗶𝗰𝗶𝗮𝗹 𝗦𝘁𝗼𝗿𝗲

*‣ 𝖩𝗎𝖽𝗎𝗅 :*
 ${get_resultP.judul}
*‣ 𝖫𝗂𝗇𝗄𝗇𝗒𝖺 :*
${get_resultP.url_audio}

𝗞𝗮𝗹𝗼 𝗹𝗮𝗴𝘂 𝗘𝗿𝗿𝗼𝗿, 𝗦𝗶𝗹𝗮𝗵𝗸𝗮𝗻
𝗛𝘂𝗯𝘂𝗻𝗴𝗶 𝗢𝘄𝗻𝗲𝗿 𝗱𝗲𝗻𝗴𝗮𝗻 𝗞𝗲𝘁𝗶𝗸 #owner`
mfar.sendMessage(from, textP, text,{contextInfo:{
"forwardingScore": 1000000000,
isForwarded: false,
sendEphemeral: false,
"externalAdReply": {
"title": `Hallo ${pushname}` ,
"body": `Download Lagu ${query}`,
"mediaType": "2",
"thumbnailUrl": `${get_resultP.image_thumbnail}`,
"mediaUrl": "https://youtu.be/kgnIpVs1Y9M",
"thumbnail": fs.readFileSync("./image/thumb.jpg"),
"sourceUrl": "https://youtu.be/kgnIpVs1Y9M"
},mentionedJid:[sender]}, quoted : mek})
get_audio = await getBuffer(get_resultP.url_audio)
reply(mess.wait)
mfar.sendMessage(from, get_audio, audio, { mimetype: Mimetype.mp4Audio, filename: `${get_resultP.title}.mp3`, quoted: mek})
break

case 'ytmp4':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if (args.length === 0) return reply(`Example : ${prefix + command} Duka`)
var srch = args.join(' ')
aramas = await yts(srch);
aramat = aramas.all 
var mulaikah = aramat[0].url
try {
yta(mulaikah)
.then((res) => {
const { dl_link, thumb, title, filesizeF, filesize } = res
axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
.then(async (a) => {
if (Number(filesize) >= 100000) return sendMediaURL(from, thumb, `*PLAY MUSIC*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
const captions = `‣ 𝗣𝗹𝗮𝘆 𝗩𝗶𝗱𝗲𝗼
𝗫𝗿𝘂𝘁𝘇 - 𝗢𝗳𝗳𝗶𝗰𝗶𝗮𝗹 𝗦𝘁𝗼𝗿𝗲

*𝖭𝖺𝗆𝖾 𝖬𝗎𝗌𝗂𝖼* : ${title}
*𝖥𝗂𝗅𝖾 𝖳𝗒𝗉𝖾* : MP3
*𝖫𝗂𝗇𝗄 𝖴𝗇𝖽𝗎𝗁* : ${a.data}

𝗦𝗶𝗹𝗮𝗵𝗸𝗮𝗻 𝗧𝘂𝗻𝗴𝗴𝘂 𝗠𝗲𝗱𝗶𝗮
𝗦𝗲𝗱𝗮𝗻𝗴 𝗱𝗶𝗸𝗶𝗿𝗶𝗺 𝗱𝗮𝗻 𝗕𝘂𝘁𝘂𝗵 𝗣𝗿𝗼𝘀𝗲𝘀!`
await sendMediaURL(from, thumb, captions)
sendMediaURL(from, dl_link).catch(() => reply('error'))
}) 
})
} catch (err) {
reply(mess.api.error)
}
break

case 'tiktoknowm':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if (!q) return reply('Linknya?')
var { TiktokDownloader } = require('./lib/tiktokdl')
reply(mess.wait)
res = await TiktokDownloader(`${q}`).catch(e => {
reply(mess.error.api)
})
console.log(res)
sendMediaURL(from, `${res.result.nowatermark}`)
break

case 'tiktokaudio':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.error.api)
if (!q) return reply('Linknya?')
reply(mess.wait)
hx.ttdownloader(`${args[0]}`)
.then(result => {
const { wm, nowm, audio } = result
axios.get(`https://tinyurl.com/api-create.php?url=${nowm}`)
.then(async (a) => {
me = `*Link* : ${a.data}`
nowmm = await getBuffer(audio)
mfar.sendMessage(from, nowmm, MessageType.audio, {mimetype:'audio/mp4', quoted: mek})
})
})
break 

case 'pinterest':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
if(!q) return reply('gambar apa?')
let pin = await hx.pinterest(q)
let ac = pin[Math.floor(Math.random() * pin.length)]
let di = await getBuffer(ac)
await mfar.sendMessage(from,di,image,{quoted: mek, caption: "*Subscribe Xrutz Official*"})
break

// 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿 𝗠𝗲𝗻𝘂
case 'shutdown':
if (!isOwner && !mek.key.fromMe) return reply(mess.only.owner)
reply('*Shutdown Sistem!*')
return mfar.sendMessage(from, JSON.stringify(eval(process.exit())))
break

case 'setppbot':
mfar.updatePresence(from, Presence.composing)
if (!isQuotedImage) return reply('Reply imagenya!')
if (!isOwner && !mek.key.fromMe) return reply(mess.only.owner)
enmediau = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
mediau = await mfar.downloadAndSaveMediaMessage(enmediau)
await mfar.updateProfilePicture(botNumber, mediau)
reply(mess.success)
break

case 'jadibot':
if (!isOwner && !mek.key.fromMe) return reply(mess.only.owner)
jadibot(fakestatus,mfar,from)
break

case 'stopjadibot':
stopjadibot(fakestatus)
break

case 'listbot':
case 'listjadibot':
if (!isOwner && !mek.key.fromMe) return reply(mess.only.owner)
let jamdibot = '「 𝗟𝗜𝗦𝗧 𝗝𝗔𝗗𝗜 𝗕𝗢𝗧 」\n\n'
for(let i of listjadibot) {
jamdibot += `*Nomor* : ${i.jid.split('@')[0]}
*Nama* : ${i.name}
*Device* : ${i.phone.device_manufacturer}
*Model* : ${i.phone.device_model}\n\n`
}
fakestatus(jamdibot)
break

case 'bc':
case 'broadcast':
if (!isOwner) return  reply(mess.only.owner)
if (args.length < 1) return reply('Teks?')
anu = await mfar.chats.all()
if (isMedia && !mek.message.videoMessage || isQuotedImage) {
const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
bc = await mfar.downloadMediaMessage(encmedia)
for (let _ of anu) {
mfar.sendMessage(_.jid, bc, image, {quoted: fkontak, caption: `${body.slice(4)}`})
}
reply('Suksess broadcast')
} else {
for (let _ of anu) {
mfar.sendMessage(_.jid, 
{"contentText": `${body.slice(4)}`,
"footerText": 'BROADAST XRTZ BOT',
"buttons": [
{"buttonId": `${prefix}menu`,
"buttonText": {"displayText": "𝗦𝗶𝗺𝗽𝗹𝗲 𝗠𝗲𝗻𝘂"
},"type": "RESPONSE"}
], "headerType": 1,
}, MessageType.buttonsMessage )
}
reply('Suksess broadcast')
}
break

case 'mode':
buttonss = [{buttonId: `${prefix}public`, buttonText: {displayText: '𝗣𝗨𝗕𝗟𝗜𝗖'}, type: 1},{buttonId: `${prefix}self`, buttonText: {displayText: '𝗦𝗘𝗟𝗙'}, type: 1}]
const buMess = {
contentText: "PUBLIC / SELF",
footerText: 'Silahkan Pilih Salah Satu Kak!',
buttons: buttonss,
headerType: 1
}
await mfar.sendMessage(from, buMess, MessageType.buttonsMessage, {quoted: ftrol})
break

case 'public':
if (!isOwner && !mek.key.fromMe) return reply(mess.only.owner)
publik = true
reply('Sukses mengubah Ke Public')
break

case 'self':
if (!isOwner && !mek.key.fromMe) return reply(mess.only.owner)
publik = false
reply('Sukses mengubah Ke Self')
break

case 'report':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
const pesan = body.slice(8)
if (pesan.length > 300) return pras.sendMessage(from, 'Maaf, Teks Kepanjangan', text, { quoted: ftrol })
var nomor = mek.participant
const teks1 = `「 *_REPORT_* 」\n*Nomor :* wa.me/${sender.split("@s.whatsapp.net")[0]}\n*Keluhan :* ${pesan}`
var options = {
text: teks1,
contextInfo: { mentionedJid: [nomor] },
}
mfar.sendMessage(`${owner}@s.whatsapp.net`, options, text, { quoted: ftrol })
reply('*Masalah di Laporkan!*')
break

case 'sc':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
screp =`*‣ Youtube Script :*
https://youtu.be/kgnIpVs1Y9M

*‣ Script Github :*
https://github.com/XrutzMalesin/MfarBot
Silahkan Gunakan Scriptnya Gratis!`
reply(screp)
break

case 'sewabot':
if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted: floc})
swabt =`┏━━⬣ 𝗟𝗜𝗦𝗧 𝗦𝗘𝗪𝗔
┃⬡ 𝖲𝖾𝗁𝖺𝗋𝗂 : 2𝖪
┃⬡ 𝖲𝖾𝗆𝗂𝗇𝗀𝗀𝗎 : 10𝖪
┃⬡ 𝖲𝖾𝖻𝗎𝗅𝖺𝗇 : 15𝖪
┗━━━━⬣`

footer =`𝗠𝗶𝗻𝗮𝘁 𝗨𝗻𝘁𝘂𝗸 𝗦𝗲𝘄𝗮?
𝖫𝖺𝗇𝗀𝗌𝗎𝗇𝗀 𝖧𝗎𝖻𝗎𝗇𝗀𝗂 𝖮𝗐𝗇𝖾𝗋!

Ⓒ︎ 𝙓𝙧𝙪𝙩𝙯 𝙊𝙛𝙛𝙞𝙘𝙞𝙖𝙡 - 𝘽𝙤𝙩`
sendButLocation(from, `${swabt}`, `${footer}`, {jpegThumbnail:ofrply,name:""}, [{ buttonId: `${prefix}owner`, buttonText: { displayText: '𝗖𝗿𝗲𝗮𝘁𝗼𝗿' }, type: 1 }, { buttonId: `${prefix}menu`, buttonText: { displayText: '𝗕𝗮𝗰𝗸 𝗠𝗲𝗻𝘂' }, type: 1 }], {contextInfo: { mentionedJid: [sender]}})
break

case 'restart':
if (!isOwner && !mek.key.fromMe) return reply(mess.only.owner)
reply(`*Restarting ${botName}*`)
exec(`cd && npm start`)
sleep(4000)
reply('Sukses')
break

if (budy.includes(`#menu`)) {
const men = fs.readFileSync('./menu.mp3');
mfar.sendMessage(from, men, MessageType.audio, {quoted: mek})
}

if (budy.includes(`.menu`)) {
const man = fs.readFileSync('./menu.mp3');
mfar.sendMessage(from, man, MessageType.audio, {quoted: mek})
}

if (budy.includes(`!menu`)) {
const min = fs.readFileSync('./menu.mp3');
mfar.sendMessage(from, min, MessageType.audio, {quoted: mek})
}

// 𝗠𝗲𝗻𝗴𝗞𝗲𝗹𝗮𝗿 𝗦𝘂𝗱𝗮𝗵
default:  } 
if (isOwner) {
if (budy.startsWith('>')) {
console.log(color('|EVAL|'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`eval return`))
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
reply(`${evaled}`)
} catch (err) {
reply(`${err}`)
}
} else if (budy.startsWith('x')) {
console.log(color('|EVAL|'), color(moment(mek.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`eval identy`))
try {
return mfar.sendMessage(from, JSON.stringify(eval(budy.slice(2)), null, '\t'), text, { quoted: ftrol })
} catch (err) {
e = String(err)
reply(e)
}
}

if (!isGroup && !isCmd && !mek.key.fromMe){
teks = `Maaf @${senderr.split('@')[0]}, ${prefix + command} tidak ada di Menu`
} 
}
	} catch (e) {
    e = String(e)
            if (!e.includes("this.isZero")) {
            if (!e.includes("Cannot read property 'conversation' of null")) {
            if (!e.includes("Cannot read property 'contextInfo' of undefined")) {
            if (!e.includes("Cannot set property 'mtype' of undefined")) {
            if (!e.includes("jid is not defined")) {
     console.log(color('|ERR|', 'red'), color(e, 'cyan'))
     mfar.sendMessage(`6283871990243@s.whatsapp.net`, `「 *_SUCH ERROR_* 」\n\n\`\`\`${e}\`\`\`\n`, MessageType.text, {contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title: "Xrutz - Selfbot",body:"",previewType:"PHOTO",thumbnail:fs.readFileSync('./image/thumb.jpg'),sourceUrl:"https://wa.me/6283871990243"}}})
	}
    }
    }
    }
    }
    }
    }


	
    
