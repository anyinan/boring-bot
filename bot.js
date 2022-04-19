/*
 * setup
 */

const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: false });

//微软TTS
const { SpeechSynthesisOutputFormat, SpeechConfig, AudioConfig, SpeechSynthesizer } = require("microsoft-cognitiveservices-speech-sdk");


/*
 * dictionaries & array
 */

//机器人回复列表
var dict = {
	"hello": "Hi",
	"你好": "您好",
	"干啥呢": "这不在群里值班嘛...",
	"help": "害各这儿放羊屁呢，说中文..",
	"帮助": "帮助指令为 help",
	"晚安": "睡尼玛，起来嗨",
	"早上好": "起这么早啊，打工人",
	"中午好": "起这么早啊，打工人",
	"下午好": "起这么早啊，打工人",
};
//水果摊 动物园
var fruitEmojis = ['🍐', '🍊', '🍋', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝'];
var animalEmojis = ['🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐸', '🐵', '🐘', '🦛'];


var ttsQueue = [];
var isTtsPlaying = false;
var myVoiceChannel;
var prevSpeaker;
const OutputFileName = "output.mp3";

//限定在特定的频道 ， 测试ID 775196687408431135 说不了话的人 888202754969972766
const TextToSpeechChannelID = "888202754969972766";
const SYNTHESIZER_TOKEN = process.env.AZURE_TOKEN;
const SYNTHESIZER_REGION_CODE = process.env.AZURE_REGION_CODE;

const ttsStylePrefix = "\n\t\t<mstts:express-as style=\"";
const ttsStylePosfix = "\">\n\t\t\t";

var styleDict = {
	"讨喜": "affectionate",
	"生气": "angry",
	"助理": "assistant",
	"平静": "calm",
	"聊天": "chat",
	"愉快": "cheerful",
	"客服": "customerservice",
	"沮丧": "depressed",
	"抱怨": "disgruntled",
	"尴尬": "embarrassed",
	"关心": "empathetic",
	"害怕": "fearful",
	"温柔": "gentle",
	"优美": "lyrical",
	"新闻": "newscast",
	"伤心": "sad",
	"严肃": "serious",
};


/*
 * 連上線時的事件
 */

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log(`ready as Ann`);
	//添加机器人状态
	client.user.setActivity("别的机器人干活", { type: "WATCHING" });
});


/*
 * text to speech
 */

//处理用户的信息， 去掉 tag 生成 ssml 字符串
var msgPreProcess = function (msg) {
	var result = {};
	var msgContent = msg.content.trim();
	result.ssml = "";

	//检查关键词 #fe
	if (msgContent.indexOf("#fe") !== -1) {
		msgContent = msgContent.replace("#fe", "");
		//设定女声 晓晓
		result.voiceName = "zh-CN-XiaoxiaoNeural";
	} else {
		//设定男声 云希
		result.voiceName = "zh-CN-YunxiNeural";
	}

	msgContent = msgContent.trim();

	if (msgContent.indexOf("#") === -1) {
		result.ssml += msgContent
		return result;
	} else if (msgContent.indexOf("#") !== 0) {
		result.ssml += msgContent.substring(0, msgContent.indexOf("#"));
		msgContent = msgContent.substring(msgContent.indexOf("#"), msgContent.length)
    }

	while (msgContent.indexOf("#") !== -1) {
		var styleKey = msgContent.substring(1, 3);
		if (styleDict[styleKey] !== undefined) {
			result.style = styleDict[styleKey];
		} else {
			result.style = "chat";
		}
		msgContent = msgContent.substring(3, msg.content.length);
		var msgPart
		if (msgContent.indexOf("#") !== -1) {
			msgPart = msgContent.substring(0, msgContent.indexOf("#"));
		} else {
			msgPart = msgContent.substring(0, msgContent.length);
		}
		msgContent = msgContent.substring(msgContent.indexOf("#"), msg.content.length);
		console.log(msgPart)
		result.ssml += ttsStylePrefix + result.style + ttsStylePosfix
			+ msgPart
			+ "\n\t\t</mstts:express-as>"
		console.log(msgPart)
    }

	return result;
}

function synthesizeSpeech(msgProcess, tts_text) {
	isTtsPlaying = true;

	//语音合成语言
	const speechConfig = SpeechConfig.fromSubscription(process.env.AZURE_TOKEN, process.env.AZURE_REGION_CODE);
	const audioConfig = AudioConfig.fromAudioFileOutput(OutputFileName);

	//ssml 格式生成
	const result = msgProcess(tts_text);
	const currSpeaker = tts_text.member.displayName;
	
	var speakerString;
	
	if(!prevSpeaker || currSpeaker != prevSpeaker){
		prevSpeaker = currSpeaker
		speakerString = currSpeaker + "说: ";
	}else{
		speakerString = "";
	}
		
	const syn_name = speakerString;
	const ssml = "<speak version=\"1.0\" xmlns=\"http://www.w3.org/2001/10/synthesis\" "
		+ "xmlns:mstts=\"https://www.w3.org/2001/mstts\" xml:lang=\"zh-CN\" >"
		+ "\n\t<voice name=\"" + result.voiceName + "\">"
		+ "\n\t\t" + syn_name
		+ result.ssml
		+ "\n\t</voice>"
		+ "\n</speak>";
	console.log(ssml);

	//合成语音文件
	const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);
	synthesizer.speakSsmlAsync(
		ssml,
		result => {
			if (result) {
				console.log(JSON.stringify(result));
			}
			// 机器人进入语音频道
			myVoiceChannel.join()
				.then(connection => {
					//播放合成好的语音文件
					dispatcher = connection.play(OutputFileName);
					dispatcher.on("finish", end => {
						console.log('audio.mp3 has finished playing!')
						//队列处理
						if (ttsQueue.length > 0) {
							synthesizeSpeech(msgPreProcess, ttsQueue.shift());
						} else {
							isTtsPlaying = false;
						}
					});
				})
				.catch(console.error);
			synthesizer.close();
		},
		error => {
			console.log(error);
			synthesizer.close();
		});
}

/* 
 * 當 Bot 接收到訊息時的事件
 */

client.on('message', msg => {

	// 文字转语音功能
	if (msg.channel.id === TextToSpeechChannelID && !msg.author.bot) {
		myVoiceChannel = msg.member.voice.channel;
		if (myVoiceChannel) {
			if (isTtsPlaying || ttsQueue.length > 0) {
				ttsQueue.push(msg);
			} else {
				synthesizeSpeech(msgPreProcess, msg);
			}
		} else {
			msg.reply("要想使用文字转语音功能，请先进入一个语音频道。");
		}
    }
	
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
	
	//为用户添加角色

	//在discord 设置 -> 外观 -> 启用开发者模式， 然后右键需要检测的频道，复制ID
	const ROLE_ASSIGN_KEYWORD = "role";
	const ROLE_REMOVE_KEYWORD = "rmrole";
	
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
	
	if (msg.content === 'fruits' || msg.content === '水果摊') {
		msg.react('🍏')
		for (var i = 0; i < fruitEmojis.length; i++) {
		  	 msg.react(fruitEmojis[i])
		}
	}
	if (msg.content === 'animals' || msg.content === '动物园') {
		msg.react('🐎')
		for (var i = 0; i < animalEmojis.length; i++) {
		  	 msg.react(animalEmojis[i])
		}
	}

	if(msg.content.substring(0, 4) == "生日快乐"){
		msg.channel.send('https://tenor.com/view/happy-birthday-to-you-minions-singing-gif-15506821' )
	}

	
	if(msg.content.indexOf('好无聊啊') !== -1) {
		msg.reply('指令列表：你是、你真、水果摊、生日快乐' )
	}

	// 生成卡片 示例
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

	// 生成卡片 炸鸡
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
client.login(process.env.BOT_TOKEN);
