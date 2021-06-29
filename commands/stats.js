let Discord = require("discord.js");
let config = require("../config.json");
module.exports = {
    name: "stats",
    description: "Bot Statistics",
    usage: "stats",
    execute(message,args,client) {
        let embed = new Discord.MessageEmbed()
            .setAuthor("Bot Statistics")
            .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
            .setColor(config.embed_color)
            .addField("Servers","```" + client.guilds.cache.size + "```",true)
            .addField("Channels","```" + client.channels.cache.size + "```",true)
            .addField("Users","```" + client.users.cache.size + "```",true)
            .setTimestamp()
            .setFooter(
                "Requested by " + message.author.username,
                message.author.displayAvatarURL({
                    format: "png",
                    dynamic: true
                })
            );
        message.channel.send(embed)

    }
    }