
const Discord = require('discord.js');

//const { token } = require('./token.json');
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
	if (msg.mentions.has(client.user)) {
		
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

		//不是很会用这个 request......
		
// 		if(msg.content.indexOf('谷歌一下') !== -1){
// 			const request = require('request');
// 			request('http://www.google.com', function (error, response, body) {
// 				 console.error('error:', error); // Print the error if one occurred
// 				 console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
// 				 msg.reply(body);
// 			});   
// 		}
	}
	
	var fruitEmojis 	= ['🍐','🍊','🍋','🍉','🍇','🍓','🍈','🍒','🍑','🥭','🍍','🥥','🥝'];
	var animalEmojis 	= ['🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐸','🐵','🐘','🦛'];
	
	if (msg.content === 'fruits' || msg.content === '水果摊') {
		msg.react('🍏')
		for (var i = 0; i < fruitEmojis.length; i++) {
		  	 msg.react(fruitEmojis[i])
		}
			//.catch(() => console.error('One of the emojis failed to react.'));
	}
	if (msg.content === 'animals' || msg.content === '动物园') {
		msg.react('🐎')
		for (var i = 0; i < animalEmojis.length; i++) {
		  	 msg.react(animalEmojis[i])
		}
			//.catch(() => console.error('One of the emojis failed to react.'));
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
	
	if(msg.content.indexOf('看看卡片效果') !== -1) {
		const embed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('标题在这里')
		.setURL('https://discord.js.org/')
		.setAuthor('名字在这里', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
		.setDescription('描述在这里')
		.setThumbnail('https://i.imgur.com/wSTFkRM.png')
		.addFields(
			{ name: '正常的Fields标题', value: '一些数据额' },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Fields标题', value: '一些数据额', inline: true },
			{ name: 'Fields标题', value: '一些数据额', inline: true },
		)
		.addField('Inline field title', '一些数据额e', true)
		.setImage('https://i.imgur.com/wSTFkRM.png')
		.setTimestamp()
		.setFooter('页脚在这里', 'https://i.imgur.com/wSTFkRM.png');
		msg.channel.send(embed);
	}
	
	if(msg.content.indexOf('最好吃的炸鸡') !== -1) {
		const embed = new Discord.MessageEmbed()
		.setColor('#ff9900')
		.setTitle('大温地区最好吃的炸鸡！')
		.setURL('https://discord.js.org/')
		.setAuthor('The Chicken 咕咕哒', 'https://thechicken371095867.files.wordpress.com/2020/10/cropped-logo.png', 'https://thechicken.ca/')
		.setDescription('来自中国的炸鸡风味，让你想起小时候的味道')
		.setThumbnail('https://thechicken371095867.files.wordpress.com/2020/10/cropped-logo.png')
		.addFields(
			{ name: '咕咕哒鸡肉汉堡', value: '好吃', inline: true },
			{ name: '咕咕哒炸鸡腿', value: '好吃+1', inline: true },
			{ name: '咕咕哒整鸡', value: '好吃+2', inline: true },
		)
		.setImage('https://www.masterpon.com/wp-content/uploads/b52chicken21-750x500.jpg')
		.setTimestamp()
		.setFooter('无聊机器人百科');
		msg.channel.send(embed);
	}
	
	if(msg.content.indexOf('TheShy相亲') !== -1) {
		const embed = new Discord.MessageEmbed()
		.setColor('#ff9900')
		.setTitle('The Shy 找女朋友')
		.setURL('https://discord.js.org/')
		.setAuthor('------', 'https://5b0988e595225.cdn.sohucs.com/images/20191031/f6b1282ab0fb407689461b8875557db0.jpeg', 'https://thechicken.ca/')
		.setDescription('有趣的灵魂，寻找另一个有趣的灵魂')
		.setThumbnail('https://5b0988e595225.cdn.sohucs.com/images/20191031/f6b1282ab0fb407689461b8875557db0.jpeg')
		.addFields(
			{ name: '附上我的照片', value: '--->', inline: true },
		)
		.setImage('https://img5.mtime.cn/CMS/News/2019/08/21/180647.42489992_620X620.jpg')
		.setTimestamp()
		.setFooter('有趣的妹子请私信我');
		msg.channel.send(embed);
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
//client.login(token);
