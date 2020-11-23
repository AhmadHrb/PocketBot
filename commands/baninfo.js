const Discord = require("discord.js")
const config = require("../config.json")
module.exports = {
    name: "baninfo",
    description: "Gets ban information",
    usage: "baninfo @user",
    needs: "BAN_MEMBERS",
    async execute(message,args,client) {
            let user = args[0];
            if (!user) return client.usage(message,"baninfo");
            let baninfo = await message.guild.fetchBan(user);
            sendEmbed(message,client,"Ban Info:","User: **" + baninfo.user.username + "**\nReason: `" + baninfo.reason + "`")

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