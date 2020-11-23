const Discord = require("discord.js");
module.exports = {
    name: 'ping',
    description: 'Ping!',
    usage: "ping",
    execute(message, args, client) {

        const ping = Date.now() - message.createdTimestamp
        let sendEm = new Discord.MessageEmbed()
            .setColor(client.color)
            .setAuthor("Pong!")
            .setTitle(":green_heart: `" + ping + " ms`")
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
}