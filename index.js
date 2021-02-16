/*
 *
 *  Pocket Bot - Under MIT License
 *  CopyRight 2020 - Pocket, Inc.
 *  support@pocket-inc.ml
 *
 */

// Discord
const Discord = require("discord.js");
const client = new Discord.Client();

// File System
const fs = require("fs");
const config = require("./config.json");
const prefix = config.prefix;

//Mongo Database
const mongodb = require("mongodb")

const MongoClient = new mongodb.MongoClient.connect(config.mongodb,function (err,db) {
    if (err) throw err;
    client.db = db;
    client.log("Connected to Database!")
})

client.color = config.embed_color;
client.login(config.token);

client.on("ready",function () {
    fs.writeFile("./bot.log","",function (err) {})

    client.log(`${client.user.username} Is ready!`);
    client.user.setActivity(config.game).then(() => client.log("Activity: " + config.game))

    client.db.db("pocket_bot").collection("log").find({}).toArray(function (err, result) {
        for (let i = 0; i < result.length; i++) {
            let guild = result[i].guild;
            client.log[guild] = result[i].log;
        }
        client.log("Loaded " + result.length + " Log Channels!")
    })

})
client.on("message",function (message) {
    if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase();

    if (client.commands.has(command)) {
        if (client.commands.get(command).needs) if (!message.member.hasPermission(client.commands.get(command).needs)) return client.noPerm(message,client.commands.get(command).needs);
        client.commands.get(command).execute(message, args, client);
    }
})

// ---Logging---
client.on("messageDelete",function (msg) {

    if (msg.author.bot || !msg.guild) return;
    if (!client.log[msg.guild.id]) return;
    let channel = client.log[msg.guild.id];
    if (!client.channels.cache.get(channel)) return;

    let Embed = new Discord.MessageEmbed()
        .setAuthor(msg.author.tag,msg.author.displayAvatarURL({dynamic:true}))
        .setDescription("**Message sent by <@" + msg.author.id + "> deleted in <#" + msg.channel.id + ">**\n**Message**:\n" + msg.content)
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter("User: " + msg.author.id + " | Guild: " + msg.guild.id)
    client.channels.cache.get(channel).send(Embed)
})
client.on("messageUpdate",function (oldMsg,newMsg) {

    if (newMsg.author.bot || !newMsg.guild) return;
    if (!client.log[newMsg.guild.id]) return;
    let channel = client.log[newMsg.guild.id];
    if (!client.channels.cache.get(channel)) return;
    if (newMsg.partial || oldMsg.content == newMsg.content || !newMsg.content || !oldMsg.content) return;

    let Embed = new Discord.MessageEmbed()
        .setAuthor(newMsg.author.tag,newMsg.author.displayAvatarURL({dynamic:true}))
        .setDescription("**Message sent by <@" + newMsg.author.id + "> edited in <#" + newMsg.channel.id + ">**\n**Before**:\n" + oldMsg.content + "\n\n**After**:\n" + newMsg.content + "\n\n[Message Link](" + newMsg.url + ")")
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter("User: " + newMsg.author.id + " | Guild: " + newMsg.guild.id)

    client.channels.cache.get(channel).send(Embed)
})
client.on("channelCreate",function (ch) {

    if (!ch.guild) return;
    if (!client.log[ch.guild.id]) return;
    let channel = client.log[ch.guild.id];
    if (!client.channels.cache.get(channel)) return;

    let Embed = new Discord.MessageEmbed()
        .setAuthor(ch.guild.name,ch.guild.iconURL({dynamic:true}))
        .setDescription("**New Channel Created**:\n<#" + ch.id + ">")
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter("Guild: " + ch.guild.id)
    client.channels.cache.get(channel).send(Embed)
})
client.on("channelDelete",function (ch) {

    if (!ch.guild) return;
    if (!client.log[ch.guild.id]) return;
    let channel = client.log[ch.guild.id];
    if (!client.channels.cache.get(channel)) return;

    let Embed = new Discord.MessageEmbed()
        .setAuthor(ch.guild.name,ch.guild.iconURL({dynamic:true}))
        .setDescription("**Channel Deleted**:\n" + ch.name)
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter("Guild: " + ch.guild.id)
    client.channels.cache.get(channel).send(Embed)
})
client.on("guildBanAdd",function (guild,member) {

    if (!client.log[guild.id]) return;
    let channel = client.log[guild.id];
    if (!client.channels.cache.get(channel)) return;

    let Embed = new Discord.MessageEmbed()
        .setAuthor(guild.name,guild.iconURL({dynamic:true}))
        .setDescription("**Member Banned:**:\n" + member.tag)
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter("User: " + member.id + " | Guild: " + guild.id)
    client.channels.cache.get(channel).send(Embed)
})
client.on("guildBanRemove",function (guild,member) {
    if (!client.log[guild.id]) return;
    let channel = client.log[guild.id];
    if (!client.channels.cache.get(channel)) return;

    let Embed = new Discord.MessageEmbed()
        .setAuthor(guild.name,guild.iconURL({dynamic:true}))
        .setDescription("**Member Unbanned:**:\n" + member.tag)
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter("User: " + member.id + " | Guild: " + guild.id)
    client.channels.cache.get(channel).send(Embed)
})
client.on("inviteCreate",function (invite) {

    if (!invite.guild) return;
    if (!client.log[invite.guild.id]) return;
    let channel = client.log[invite.guild.id];
    if (!client.channels.cache.get(channel)) return;

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
    client.channels.cache.get(channel).send(Embed)
})
client.on("roleCreate",function (role) {
    if (!client.log[role.guild.id]) return;
    let channel = client.log[role.guild.id];
    if (!client.channels.cache.get(channel)) return;

    let Embed = new Discord.MessageEmbed()
        .setAuthor(role.guild.name,role.guild.iconURL({dynamic:true}))
        .setDescription("**Role Created:**:\n" + role.name)
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter( "Guild: " + role.guild.id)
    client.channels.cache.get(channel).send(Embed)
})
client.on("roleUpdate",function (oldRole,newRole) {
    if (!client.log[newRole.guild.id]) return;
    let channel = client.log[newRole.guild.id];
    if (!client.channels.cache.get(channel)) return;

    let Embed = new Discord.MessageEmbed()
        .setAuthor(newRole.guild.name,newRole.guild.iconURL({dynamic:true}))
        .setDescription("**Role Updated:**:\n" + oldRole.name)
        .addField("Changes:","Will be done soon")
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter("Guild: " + newRole.guild.id)
    client.channels.cache.get(channel).send(Embed)
})

client.on("roleDelete",function (role) {
    if (!client.log[role.guild.id]) return;
    let channel = client.log[role.guild.id];
    if (!client.channels.cache.get(channel)) return;

    let Embed = new Discord.MessageEmbed()
        .setAuthor(role.guild.name,role.guild.iconURL({dynamic:true}))
        .setDescription("**Role Deleted:**:\n" + role.name)
        .setTimestamp()
        .setColor(config.embed_color)
        .setFooter( "Guild: " + role.guild.id)
    client.channels.cache.get(channel).send(Embed)
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
client.noPerm = function (message, perm) {
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
function loadCommands() {
    client.commands = new Discord.Collection();
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
        if (command.alias) {
            client.commands.set(command.alias, command)
        }
    }
}
loadCommands()

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
client.log = function (message) {
    let time = new Date();
    let logMsg = `${time.getDate()}-${time.getMonth()}-${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} [INFO] ${message}`;
    fs.appendFile("./bot.log",logMsg + "\n",function (err) {})
    console.log(logMsg)
}
client.err = function (message) {
    let time = new Date();
    let logMsg = `${time.getDate()}-${time.getMonth()}-${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} [ERR] ${message}`;
    fs.appendFile("./bot.log",logMsg + "\n",function (err) {})
    console.log(logMsg)
}