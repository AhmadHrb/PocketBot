const Discord = require("discord.js")
const config = require("../config.json")
module.exports = {
    name: "userinfo",
    description: "Get information about user",
    usage: "userinfo @user",
    execute(message,args,client) {
        let user = message.mentions.members.first() || message.member;
        if (!user) return client.usage(message,"userinfo");
        let activity = user.user.presence.activities[0] || "None";
        let nick = user.nickname || "None";
        let type = "Human"
        if (user.user.bot) type = "Bot";
        let boosting = "No";
        if (user.premiumSinceTimestamp) boosting = "Yes"
        let roles = "```None```";
        if (user._roles.length > 0) roles = "<@&" + user._roles.join(">, <@&") + ">";

        let Embed = new Discord.MessageEmbed()
            .setAuthor(user.user.tag,user.user.displayAvatarURL({dynamic:true}))
            .addField("Status:","```" + user.user.presence.status + "```",true)
            .addField("Activity:","```" + activity + "```",true)
            .addField("Nick:","```" + nick + "```",true)
            .addField("Type:","```" + type + "```",true)
            .addField("Boosting?","```" + boosting + "```",true)
            .addField("Avatar:","[Click Me](" + user.user.displayAvatarURL() + ")",true)
            .addField("Roles:",roles)
            .addField("Joined Discord:","```" + user.user.createdAt + "```")
            .addField("Joined Guild:","```" + user.joinedAt + "```")
            .setTimestamp()
            .setColor(config.embed_color)
            .setFooter("User: " + user.user.id + " | Guild: " + message.guild.id)
            .setThumbnail(user.user.displayAvatarURL())
        message.channel.send(Embed)
    }
}