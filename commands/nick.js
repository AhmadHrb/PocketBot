const config = require("../config.json")
module.exports = {
    name: "nick",
    description: "Change the nickname of a member",
    needs: "MANAGE_NICKNAMES",
    alias: "nickname",
    usage: "nick <@user> <new nick>",
    execute(message,args,client) {
        if (!args[1] || !message.guild.members.cache.has(args[0].slice(2,-1)) && !client.users.cache.has(args[0].slice(3,-1))) return client.usage(message,"nick")
        let member = message.mentions.members.first();
        let nick = args.slice(1).join(" ");
            member.setNickname(nick).then(function () {
                client.sendEmbed(message, client, `:${config.emoji_success}: Success!`, "Successfully changed <@" + member.user.id + ">'s Nickname to: `" + nick + "`")
            }).catch(function () {
                client.sendEmbed(message,client,`:${config.emoji_x}: No Permission!`,"I can't change nickname of users above my role!")
            })

    }


}