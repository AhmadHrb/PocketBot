const Discord = require("discord.js")
const config = require("../config.json")
module.exports = {
    name: "tempban",
    description: "Bans a mentioned user for a time",
    usage: "tempban minutes @user",
    needs: "BAN_MEMBERS",
    execute(message,args,client) {
        if (message.mentions.members.first()) {
            let user = message.mentions.members.first();
            if (!user || !args[1]) return client.usage(message,"tempban");
            let days = parseInt(args[1]);
            let reason = "No Reason";
            if (args[2]) reason = args.slice(2).join(" ")
            user.user.send("You was banned from **" + message.guild.name + "** For **" + days + "**  Days for Reason: `" + reason + "`").then(() => {
                user.ban({days: days, reason: reason}).then(() => {
                    sendEmbed(message,client,`:${config.emoji_success}: Success!`,"Banned **" + user.user.tag + "** For **" + days + "** Days for Reason: `" + reason + "`")
                });
            })
        } else client.usage(message,"tempban")
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