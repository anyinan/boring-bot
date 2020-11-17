
const Discord = require('discord.js');

//const { token } = require('./token.json');
const client = new Discord.Client({disableEveryone: false});

// 連上線時的事件
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log(`ready as Ann`);
	client.user.setActivity("别的机器人干活", WATCHING); 
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

var fruitEmojis 	= ['🍐','🍊','🍋','🍉','🍇','🍓','🍈','🍒','🍑','🥭','🍍','🥥','🥝'];
var animalEmojis 	= ['🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐸','🐵','🐘','🦛'];



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
	}
	
	
	if(msg.content.indexOf('setup') !== -1){
		if(msg.member.id == "363463165989617666"){
			var descrip = "向此消息添加表情来获得身份标签： (beta)\n"
			descrip += "\t0️⃣\tAmong Us\n";
			descrip += "\t1️⃣\tCall of Duty\n";
			descrip += "\t2️⃣\tLeague of Legends\n";
			descrip += "\t3️⃣\tParty Animals\n";
			
			const embed = new Discord.MessageEmbed()
			.setColor('#ff9900')
			.setDescription(descrip);
			
			msg.channel.send(embed);
			var lastMsg = msg.channel.lastMessage;
 			lastMsg.react('0️⃣');
// 				.then(() => lastMsg.react('1️⃣'))
// 				.then(() => lastMsg.react('2️⃣'))
// 				.then(() => lastMsg.react('3️⃣'))
		}

	}
	
	//为用户添加角色

	//在discord 设置 -> 外观 -> 启用开发者模式， 然后右键需要检测的频道，复制ID
	//const ROLE_ASSIGN_CHANNEL_ID = "777267043161473045";
	const ROLE_ASSIGN_KEYWORD = "role";
	const ROLE_REMOVE_KEYWORD = "rmrole";

	//if (msg.channel.id == ROLE_ASSIGN_CHANNEL_ID) {
	if (true) {
		//检查是否为添加角色指令
		if(msg.content.substring(0, ROLE_ASSIGN_KEYWORD.length) == ROLE_ASSIGN_KEYWORD){
			var roleName = msg.content.substring(ROLE_ASSIGN_KEYWORD.length).trim()
			var theRole = msg.guild.roles.cache.find(role => role.name === roleName);
			if (!theRole) {
				msg.reply("服务器里还没有叫 " + roleName + " 的标签。")
			} else {
				msg.member.roles.add(theRole); 
				msg.reply("你现在有了新的标签 " + theRole.name)
			}
		}
		if(msg.content.substring(0, ROLE_REMOVE_KEYWORD.length) == ROLE_REMOVE_KEYWORD){
			var roleName = msg.content.substring(ROLE_REMOVE_KEYWORD.length).trim()
			var theRole = msg.guild.roles.cache.find(role => role.name === roleName);
			if (!theRole) {
				msg.reply("没有叫 " + roleName + " 的标签。")
			} else {
				msg.member.roles.remove(theRole); 
				msg.reply("已删除标签 " + theRole.name)
			}
		}
	}
	
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

var roleRef = {
	"0️⃣" : "775231615190302730" ,
	"1️⃣" : "777117598008475658",
	"2️⃣" : "777116219064188948" ,
	"3️⃣" : "777119364813553685" ,
};

// client.on('messageReactionAdd', (reaction, user) => {
//         let message = reaction.message, emoji = reaction.emoji;
// 	const ROLE_ASSIGN_MSG_ID = "777298548961312799";
// 	if(message.id == ROLE_ASSIGN_MSG_ID){
// 		Object.keys(roleRef).forEach(key => {
// 			if(emoji.name == key){
// 				message.guild.fetchMember(user.id).then(member => {
// 					member.addRole(roleRef[KEY]);
// 				});
// 			}
// 		})
// 	}
// });


client.login(process.env.BOT_TOKEN);
//client.login(token);
