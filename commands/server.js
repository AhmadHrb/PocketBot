let Discord = require('discord.js')
let config = require('../config.json')
module.exports = {
    name: "server",
    description: "Server Information",
    usage: "server",
    execute(message, args, client) {
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name)
            .setThumbnail(message.guild.displayAvatarURL({dynamic: true}))
            .setColor(config.embed_color)
            .setTimestamp()
            .addField("")
    }
}