const config = require("../config.json")
module.exports = {
    name: "warn",
    description: "Warn a user for an optional reason",
    needs: "KICK_MEMBERS",
    usage: "warn <@user> [reason]",
    execute(message,args,client) {
        if (!args[0] || !message.guild.members.cache.has(args[0].slice(2,-1)) && !client.users.cache.has(args[0].slice(3,-1))) return client.usage(message,"warn")
        let user = message.guild.members.cache.get(args[0].slice(2,-1)) || client.users.cache.get(args[0].slice(3,-1))
        let reason = args.slice(1).join(" ") || "No reason";
        let id = Math.floor(Math.random() * 1000)
        var warn = { id: id, guild: message.guild.id, user: user.id, by: message.author.id, reason: reason };
        client.db.db("pocket_bot").collection("warns").insertOne(warn, function (err, res) {
            if (err) throw err;
            client.sendEmbed(message,client,`:${config.emoji_success}: Success!`,`You warned **${user.tag}** for ` + "`" + reason + "`")
            user.send(`:${config.emoji_x}: You was warned in **${message.guild.name}** by **${message.author.tag}** For: ` + "`" + reason + "`")
        });
    }


}