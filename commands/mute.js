let config = require("../config.json");
let Discord = require("discord.js")
module.exports = {
    name: "mute",
    description: "Mute a user",
    usage: "mute @user reason",
    needs: "MUTE_MEMBERS",
    async execute(message,args,client) {
        if (message.mentions.members.first()) {
            let user = message.mentions.members.first();
            let role = message.guild.roles.cache.find(role => role.name == "Muted");
            if (!role) {
                role = await message.guild.roles.create({data: {
                    color: "GREY",
                    position: 0,
                    name: "Muted",
                    mentionable: false,
                    permissions: 0,
                    },reason: "Role needed for Muted Members"})
                    message.guild.channels.cache.forEach(ch => ch.overwritePermissions([{
                        id: role,
                        deny: ['SEND_MESSAGES']
                    },],'Disallow Muted people from sending messages!'))


            }

            await user.user.send("You was muted in **" + message.guild.name + "**!").then(() => {
                user.roles.add(role);
                client.sendEmbed(message,client,`:${config.emoji_success}: Success!`,`**${user.user.tag}** Was muted!`);
            })
        } else client.usage(message,"mute");
    }
}