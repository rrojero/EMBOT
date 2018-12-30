const axios = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client();
const botconfig = require('./botconfig.json');
client.music = require('discord.js-musicbot-addon')

//yt
client.music.start(client, {
  botPrefix: "/",
  maxQueueSize: "100",
  defVolume: "12",
  anyoneCanSkip:true,
  clearInvoker:true,
  djRole:["Member","Admin","Officer","BOT"],
  disableLoop: false,
  leaveCmd: 'bye',
  ownerOverMember: true,
  botOwner: botconfig.OwnerName,
  youtubeKey: botconfig.YT_API_KEY
});
//yt end   
// translate
var array1 = ['en', 'es'];
let myURL = new URL('http://translate.yandex.com/', 'http://translate.yandex.com/');

client.on('msg', msg =>       
  {if(msg.content.startsWith('"'))
    {array1.forEach(function(chklang)
      {axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate', 
          {params: {key: botconfig.YANDEX_API_KEY,text: msg.content,lang: chklang}}).then(res => 
            {if (res.data.text[0] !== msg.content) 
             {var tranTxt =res.data.text[0];
               msg.reply('\r\n'+tranTxt.slice(1)+ '\r\n'+'\r\n'+'Powered by Yandex.Translate   ' + myURL)}
            })})}})
// translate end

// purge and nuke
    client.on('message', message => {
      if (message.member.roles.find(role => role.name === 'BOT')){
          if(message.content =='/purge 5'){
            message.channel.bulkDelete(6);}
            if(message.content =='/purge 10'){
              message.channel.bulkDelete(11); }
              if(message.content =='/purge 20'){
                message.channel.bulkDelete(21);}
                if(message.content =='/purge 50'){
                  message.channel.bulkDelete(51);}
                  if(message.content =='/nuke'){
                    message.channel.bulkDelete(100);
                    message.channel.bulkDelete(100,true);  }      
          }})

client.login(botconfig.BOT_TOKEN).then(
    console.log("logged into bot acct")
)
