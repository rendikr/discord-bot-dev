const Discord = require('discord.js')

const client = new Discord.Client()

client.on('message', (message) => {
  // Ignore messages that aren't from a server
  if (!message.guild) return;

  if (message.content === '!!ping') {
    message.channel.send(`Hello ${message.author}`)
  }

  if (message.content.startsWith('!!ban')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.ban({
          reason: 'They were bad!',
        }).then(() => {
          message.reply(`Successfully banned ${user.tag}`);
        }).catch(err => {
          message.reply('I was unable to ban the member');
          console.error(err);
        });
      } else {
        message.reply('That user isn\'t in this server!');
      }
    } else {
      message.reply('You didn\'t mention the user to ban!');
    }
  }

  if (message.content.startsWith('!!kick')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.kick('Optional reason that will display in the audit logs').then(() => {
          message.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {
          message.reply('I was unable to kick the member');
          console.error(err);
        });
      } else {
        message.reply('That user isn\'t in this server!');
      }
    } else {
      message.reply('You didn\'t mention the user to kick!');
    }
  }
})

client.on('ready', () => {
  console.log(`Bot ${client.user.tag} is online!`)
})

client.login(process.env.BOT_TOKEN)




