'use strict';
const Discord = require('discord.js');
const { token } = require('./token.json');
const client = new Discord.Client({disableEveryone: false});

// 連上線時的事件
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`ready as Ann`);
});

// 當 Bot 接收到訊息時的事件
client.on('message', msg => {
	//console.log(msg);

    if (msg.content.indexOf('hello') !== -1 || msg.content.indexOf('Hello') !== -1) {
        msg.reply('Hi!');
    }

	if(msg.content.substring(0, 2) === "你是"){
	    msg.reply('你才是' + msg.content.substring(2) )
	}
	if(msg.content.substring(0, 2) === "你真"){
	    msg.reply('你更' + msg.content.substring(2) )
	}

    if (msg.content === 'fruits' || msg.content === '水果摊') {
		msg.react('🍎')
			.then(() => msg.react('🍊'))
			.then(() => msg.react('🍇'))
			.catch(() => console.error('One of the emojis failed to react.'));
	}

	if(msg.content.substring(0, 4) == "生日快乐"){
	    msg.channel.send('https://tenor.com/view/happy-birthday-to-you-minions-singing-gif-15506821' )
	}

	if(msg.content.substring(0, 1) == "打"){
		msg.channel.send(`@everyone 有人打 ${msg.content.substring(1)}？`);
	    msg.channel.send('https://tenor.com/view/beaver-screaming-yelling-%E5%95%8A-what-gif-17769244' )
	}





	//骂人是不好的
    if(msg.content.indexOf('傻逼') !== -1) {
    	msg.reply(':rofl:他急了他急了');
    	msg.channel.send('https://tenor.com/view/avengers-language-gif-5285201' )
    	msg.react('👎');
    }	

    if(msg.content.indexOf('就这') !== -1) {
    	msg.reply(':mega:不会吧不会吧');
    	msg.channel.send('https://tenor.com/view/yuan-shan-shan-oh-no-unbelievable-gif-11900381' )
    	msg.react('👎');
    }	

});

client.login(token);