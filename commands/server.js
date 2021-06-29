let Discord = require('discord.js')
let config = require('../config.json')
let serverConfig = require("../config/server.json")
module.exports = {
    name: "server",
    description: "Server Information",
    usage: "server",
    execute(message, args, client) {
            //Roles
        let roles = "";
        message.guild.roles.cache.forEach(function(role) {
            roles += "<@&" + role.id + ">, "
        })
        let region;
        if (serverConfig.regions[message.guild.region]) {
            region = serverConfig.regions[message.guild.region]
        } else region = message.guild.region;

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name)
            .setThumbnail(message.guild.iconURL({dynamic: true}))
            .setColor(config.embed_color)
            .setTimestamp()
            .addField("ID","```" + message.guild.id + "```",true)
            .addField("Region","```" + region + "```",true)
            .addField("Owner","```" + message.guild.owner.user.tag + "```")
            .addField("Channels","```" + message.guild.channels.cache.size + "```",true)
            .addField("Members","```" + message.guild.members.cache.filter(member => member.presence.status !== "offline").size + "/" + message.guild.members.cache.size + "```",true)
            .addField("Created At: ", "```" + message.guild.createdAt + "```")
            .addField("Roles",roles)
            message.channel.send(embed)
    }
}