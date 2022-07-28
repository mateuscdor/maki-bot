const  { 
  default : MakiWitchConnect,
  DisconnectReason , 
  useSingleFileAuthState,
  MessageType,
  MessageOptions,
  downloadContentFromMessage,
  prepareWAMessageMedia,
  Mimetype,
  proto, getContentType,
  BufferJSON, 
} = require('@adiwajshing/baileys')
const {state , saveState} = useSingleFileAuthState('./cache/session.json')
const { getGroupAdmins } = require('./events/grupoAdm');
const {Boom } = require('@hapi/boom')
const { help , menu } = require('./src/menus/comand')
const pino = require('pino');
const fs = require('fs')
const Sticker = require('wa-sticker-formatter')

async function startbot(){

  const maki = MakiWitchConnect({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true,
    auth: state,
    browser: ['@Lopezs','Safari','1.0.0']
})
  //Conexão 
maki.ev.on('connection.update',(update) =>{
  //console.log(update);
require("./events/conection") (MakiConection)});
maki.ev.on('creds.update', saveState);
//
  //chats 
maki.ev.on('messages.upsert', async m =>{
try{
  const msg = m.messages[0];
if(!msg.key && msg.key.remoteJid === "status@broadcast") return
  
  const name = msg.pushName || "nome não detectado";
  const type = getContentType(msg.message)
  const content = JSON.stringify(msg.message);
  const from = msg.key.remoteJid
  const quoted = type == 'extendedTextMessage' && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.quotedMessage|| [] : [] ;
  const body = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption: (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ""
  const donoNumber = ['91984155848']
  const prefix = '/';
  const IsCmd = body.startsWith(prefix);
  const comando = IsCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ""
  const args = body.trim().split(/ +/).slice(1);
  const text = args.join(' ');
  const isGroup = from.endsWith("@.us");
  const botNumber = maki.user.id.split(':')[0]
  const sender = msg.key.fromMe ? (maki.user.id.split(':')[0]+'@s.whatsapp.net' || maki.user.id) : (msg.key.participant || msg.key.remoteJid)

  const groupMetadata = isGroup ? await maki.groupMetadata(from) : ''
  const groupName = isGroup ? groupMetadata.subject : ''
  const groupId = isGroup ? groupMetadata.id : ''
  const groupMembers = isGroup ? groupMetadata.participants : ''
  const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
  const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
  const isGroupAdmins = groupAdmins.includes(sender)
 	const isMedia = (type === 'imageMessage' || type === 'videoMessage')
 	const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
	const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
	const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
  const senderNumber = sender.split('@')[0]
  const isSaya = botNumber.includes(senderNumber)
  const dono = donoNumber.includes(senderNumber) || isSaya

  const enviar = (text) => {maki.sendMessage(from, {text: text}, { quoted: msg})}
  

  function reaction(emoji){
      const reactionEmoji = {
              react : {
                      text: emoji,
                      key: msg.key
              }
     }
maki.sendMessage(from, reactionEmoji)
}


  switch (comando) {
  
     case 'menu':
templateButtons = [
{index: 1, urlButton: {displayText: 'Grupo', url: 'https://chat.whatsapp.com/HsUtEBObAPG1GcJG5ksqus'}},
{index: 2, urlButton: {displayText: ' Dono ', url: 'https://wame/5591984155848'}},
{index: 3, quickReplyButton: {displayText: 'Criador!', id: `${prefix}criador`}},
{index: 4, quickReplyButton: {displayText: 'Ping!', id: `${prefix}ping`}},
]
templateMessage = {
image: {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvsIY2zsgF2KPSA1mHZXPze7MPuKSxPTM5_Q&usqp=CAU',
//quoted:contato},
caption:menu,
footer: '@maki-wit',
templateButtons: templateButtons
}
}
maki.sendMessage(from,templateMessage)
reaction("☺️")
break
      
            break;
case 's':
   //chamando a função de donwload;
   const stream = await downloadContentFromMessage(msg.message.imageMessage, 'image');
   enviar("Preparando requisição...");
   
   //sistema de download ;
   let buffer = Buffer.from([]);
   
   for await(const chunk of stream){
     buffer = Buffer.concat([buffer , chunk]);
  
//salvando a image com o numero da pessoa ;
  const media = `./figus/${getNumber}.jpeg`;
 //salva o arquivo
  fs.writeFileSync(media, buffer);
  // wa-sticker-formatter 
  const sticker = new Sticker(`./${getNumber}.jpeg`,{
    pack : name, // the pack name;
    author: '@maki-witch-bot', //the author name;
    type : StickerTypes.FULL, // the sticker type;
    categories: ['✅' , '💤'], //the sticker category;
    id: `${getNumber}`, // the sticker id;
    quality: 10, // the quality of the output file;
    background : '#00000000' // the color background 
})

const save = await sticker.toBuffer() //convert to buffer 

await sticker.toFile(`${getNumber}.webp`);

shiina.sendMessage(from,{
    sticker: {
        url: getNumber + ".webp"
        }})
     reaction('✅')
     
     try {
     
     fs.unlinkSync(getNumber + ".jpeg");
     await sleep(500)
     fs.unlinkSync(getNumber + ".webp");
     
     } catch (error){
     
     enviar(" 🤨 1 momento meu chapa");
     reaction("🥱");
     }

break

}} catch(error){
  console.log(error)
 }})
}startbot();
