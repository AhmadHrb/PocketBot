const Discord = require("discord.js")
const config = require("../config.json")
module.exports = {
    name: "kick",
    description: "Kicks a mentioned user",
    usage: "kick @user",
    needs: "KICK_MEMBERS",
    execute(message,args,client) {
    if (message.mentions.members.first()) {
        let user = message.mentions.members.first();
        if (!user) return client.usage(message,"kick");
        let reason = "No Reason";
        if (args[1]) reason = args.slice(1).join(" ")
        user.user.send("You was kicked from **" + message.guild.name + "** for Reason: `" + reason + "`").then(() => {
        user.kick(reason).then(() => {
            sendEmbed(message,client,`:${config.emoji_success}: Success!`,"Kicked **" + user.user.tag + "** for Reason: `" + reason + "`")
        });
        })
    } else client.usage(message,"kick")
    }
}
function sendEmbed(message,client, title,desc) {
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
    message.channel.send(sendEm);
}