const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");
const prefix = config.prefix;

client.color = config.embed_color;
client.login(config.token);

client.on("ready",function () {
    console.log(`${client.user.username} Is ready!`);
    client.user.setActivity(config.game);
})
client.on("message",function (message) {
    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase();

    if (client.commands.has(command)) {
        if (client.commands.get(command).needs) if (!message.member.hasPermission(client.commands.get(command).needs)) return noPermission(message,client.commands.get(command).needs);
        client.commands.get(command).execute(message, args, client);
    }
})

// ---Logging---
client.on("messageDelete",function (msg) {
    let Embed = new Discord.MessageEmbed()
        .setAuthor(msg.author.tag,msg.author.displayAvatarURL({dynamic:true}))
        .setDescription("**Message sent by <@" + msg.author.id + "> deleted in <#" + msg.channel.id + ">**\n**Message**:\n" + msg.content)
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter("User: " + msg.author.id + " | Guild: " + msg.guild.id)
    client.channels.cache.get("781188179586711593").send(Embed)
})
client.on("messageUpdate",function (oldMsg,newMsg) {
    if (!newMsg.partial || oldMsg.content == newMsg.content || !newMsg.content || !oldMsg.content || oldMsg.author.bot || oldMsg.guild == null) return;
    let Embed = new Discord.MessageEmbed()
        .setAuthor(newMsg.author.tag,newMsg.author.displayAvatarURL({dynamic:true}))
        .setDescription("**Message sent by <@" + newMsg.author.id + "> edited in <#" + newMsg.channel.id + ">**\n**Before**:\n" + oldMsg.content + "\n\n**After**:\n" + newMsg.content + "\n\n[Message Link](" + newMsg.url + ")")
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter("User: " + newMsg.author.id + " | Guild: " + newMsg.guild.id)
    client.channels.cache.get("781188179586711593").send(Embed)
})
client.on("channelCreate",function (channel) {
    let Embed = new Discord.MessageEmbed()
        .setAuthor(channel.guild.name,"https://cdn.discordapp.com/avatars/" + channel.guild.id + "/" + channel.guild.icon)
        .setDescription("**New Channel Created**:\n<#" + channel.id + ">")
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter("Guild: " + channel.guild.id)
    client.channels.cache.get("781188179586711593").send(Embed)
})
client.on("channelDelete",function (channel) {
    let Embed = new Discord.MessageEmbed()
        .setAuthor(channel.guild.name,channel.guild.iconURL({dynamic:true}))
        .setDescription("**Channel Deleted**:\n" + channel.name)
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter("Guild: " + channel.guild.id)
    client.channels.cache.get("781188179586711593").send(Embed)
})
client.on("guildBanAdd",function (guild,member) {
    let Embed = new Discord.MessageEmbed()
        .setAuthor(guild.name,guild.iconURL({dynamic:true}))
        .setDescription("**Member Banned:**:\n" + member.tag)
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter("User: " + member.id + " | Guild: " + guild.id)
    client.channels.cache.get("781188179586711593").send(Embed)
})
client.on("guildBanRemove",function (guild,member) {
    let Embed = new Discord.MessageEmbed()
        .setAuthor(guild.name,guild.iconURL({dynamic:true}))
        .setDescription("**Member Unbanned:**:\n" + member.tag)
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter("User: " + member.id + " | Guild: " + guild.id)
    client.channels.cache.get("781188179586711593").send(Embed)
})
client.on("inviteCreate",function (invite) {
    let Embed = new Discord.MessageEmbed()
        .setAuthor(invite.guild.name,invite.guild.iconURL({dynamic:true}))
        .setDescription("**Invite Created:** " + invite.url)
        .addField("By:","```" + invite.inviter.tag + "```",true)
        .addField("Channel:","```" + invite.channel.name + "```",true)
        .addField("Member Count:","```" + invite.memberCount + "```",true)
        .addField("Uses:","```" + invite.uses + "```",true)
        .addField("Max Age:","```" + invite.maxAge + "```",true)
        .addField("Temporary?","```" + invite.temporary + "```",true)
        .addField("Expires At:","```" + invite.expiresAt + "```")
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter("By: " + invite.inviter.tag + " | Guild: " + invite.guild.id,invite.inviter.displayAvatarURL({dynamic:true}))
    client.channels.cache.get("781188179586711593").send(Embed)
})
client.on("roleCreate",function (role) {
    let Embed = new Discord.MessageEmbed()
        .setAuthor(role.guild.name,role.guild.iconURL({dynamic:true}))
        .setDescription("**Role Created:**:\n" + role.name)
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter( "Guild: " + role.guild.id)
    client.channels.cache.get("781188179586711593").send(Embed)
})
client.on("roleUpdate",function (oldRole,newRole) {
    let Embed = new Discord.MessageEmbed()
        .setAuthor(newRole.guild.name,newRole.guild.iconURL({dynamic:true}))
        .setDescription("**Role Updated:**:\n" + oldRole.name)
        .addField("Changes:","Will be done soon")
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter("Guild: " + newRole.guild.id)
    client.channels.cache.get("781188179586711593").send(Embed)
})

client.on("roleDelete",function (role) {
    let Embed = new Discord.MessageEmbed()
        .setAuthor(role.guild.name,role.guild.iconURL({dynamic:true}))
        .setDescription("**Role Deleted:**:\n" + role.name)
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter( "Guild: " + role.guild.id)
    client.channels.cache.get("781188179586711593").send(Embed)
})

//-----
//Command Usage

client.usage = function (message, command) {
    if (client.commands.get(command).usage) {
        let usage = client.commands.get(command).usage;
        client.sendEmbed(message,client,`:${config.emoji_x}: Usage:`,"```" + usage + "```")
    }
}

// Functions
function noPermission(message, perm) {
    let sendEm = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle(`:${config.emoji_x}: You don't have permission!`)
        .setDescription("You need permission: `" + perm + "`")
        .setTimestamp()
        .setFooter(
            "Requested by " + message.author.username,
            message.author.displayAvatarURL({
                format: "png",
                dynamic: true
            })
        );
    message.channel.send(sendEm);
}
// Load Commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    if (command.alias) {
        client.commands.set(command.alias, command)
    }
}
client.sendEmbed = function(message, client, title, desc, footer) {
    let sendEm = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle(title)
        .setDescription(desc)
        .setTimestamp()
        .setFooter(
            "Requested by " + message.author.username,
            message.author.displayAvatarURL({
                format: "png",
                dynamic: true
            })
        );
    if (footer) sendEm.setFooter(footer)
    message.channel.send(sendEm);
}