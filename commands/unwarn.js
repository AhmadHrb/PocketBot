const config = require("../config.json")
const Discord = require("discord.js");
module.exports = {
    name: "unwarn",
    description: "Remove warn of user",
    needs: "KICK_MEMBERS",
    usage: "unwarn <@user> [id]",
    execute(message,args,client) {
        if (!args[0] || !message.guild.members.cache.has(args[0].slice(2,-1)) && !client.users.cache.has(args[0].slice(3,-1))) return client.usage(message,"unwarn")
        let user = message.guild.members.cache.get(args[0].slice(2,-1)) || client.users.cache.get(args[0].slice(3,-1))
        var warn = { guild: message.guild.id, user: user.id, id: parseInt(args[1]) };
        client.db.db("pocket_bot").collection("warns").find(warn).toArray(function (err,result) {
            if (result.length == 0) return message.channel.send("Warn not found!");
        client.db.db("pocket_bot").collection("warns").deleteOne(warn, function (err) {
            if (err) throw err;
            client.sendEmbed(message,client,`:${config.emoji_success}: Success!`,"Removed warn from **" + user.tag + "**!")
        });
        })
    }


}