let Discord = require('discord.js')
let fs = require("fs");
let config = require('../config.json')
module.exports = {
    name: "help",
    description: "Help Command",
    usage: "help [command]",
    execute(message, args, client) {
        let embed = new Discord.MessageEmbed()
            .setAuthor("Commands List:")
            .setColor(config.embed_color)
            .setTimestamp()
            .setFooter(
                "Requested by " + message.author.username,
                message.author.displayAvatarURL({
                    format: "png",
                    dynamic: true
                })
            );

        const commandFiles = fs.readdirSync('./').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./${file}`);
            if (command.hide === true) return;
            embed.addField(command.name, command.usage + "```" + command.description + "```")
        }
    }
}