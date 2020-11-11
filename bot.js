
const Discord = require('discord.js');
// const { token } = require('./token.json');
const client = new Discord.Client({disableEveryone: false});

// 連上線時的事件
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`ready as Ann`);
});

//Bot聊天回复列表
var dict = {
	"hello" : "Hi" ,
	"你好" : "您好",
	"干啥呢" : "这不在群里值班嘛..." ,
	"help" : "害各这儿放羊屁呢，说中文.." ,
	"帮助" : "帮助指令为 help" ,
	"晚安" : "睡尼玛，起来嗨" ,
	"早上好" : "起这么早啊，打工人" ,
	"中午好" : "起这么早啊，打工人" ,
	"下午好" : "起这么早啊，打工人" ,
};

// 當 Bot 接收到訊息時的事件
client.on('message', msg => {
	//console.log(msg);
	//当机器人被提及
	if (msg.isMentioned(client.user)) {
		
		Object.keys(dict).forEach(key => {
			if(msg.content.indexOf(key) !== -1){
				msg.reply(dict[key]);
			}
		})
		
		if(msg.content.indexOf('你是') !== -1){
			msg.reply('你才是' + msg.content.substring(msg.content.indexOf('你是') + 2) )
		}
		if(msg.content.indexOf('你真') !== -1){
			msg.reply('你更' + msg.content.substring(msg.content.indexOf('你真') + 2) )
		}
		
		if(msg.content.indexOf('成语接龙') !== -1) {
			msg.reply('好啊，来一段成语接龙吧！ 我先来：为所欲为' )
		}
		if(msg.content.indexOf('为所欲为') !== -1) {
			msg.reply('为所欲为' )
		}
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

	
	if(msg.content.indexOf('好无聊啊') !== -1) {
		msg.reply('指令列表：你是、你真、水果摊、生日快乐' )
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
	
	if(msg.content.indexOf('滚') !== -1) {
		msg.reply(':mega:我就不，你来咬我啊');
		msg.channel.send('https://tenor.com/view/rude-come-bite-me-gif-12186286' )
		msg.react('👎');
	}
});

client.login(process.env.BOT_TOKEN);
