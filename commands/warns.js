const config = require("../config.json")
const Discord = require("discord.js");
module.exports = {
    name: "warns",
    description: "Get warns of user",
    needs: "KICK_MEMBERS",
    usage: "warns <@user>",
    execute(message,args,client) {
        if (!args[0] || !message.guild.cache.has(args[0].slice(2,-1)) && !client.users.cache.has(args[0].slice(3,-1))) return client.usage(message,"warns")
        let user = message.guild.cache.get(args[0].slice(2,-1)) || client.users.cache.get(args[0].slice(3,-1))
        var warn = { guild: message.guild.id, user: user.id };
        client.db.db("pocket_bot").collection("warns").find(warn).toArray(function (err, res) {
            if (err) throw err;

            let sendEm = new Discord.MessageEmbed()
                .setColor(client.color)
                .setAuthor(user.tag,user.displayAvatarURL({dynamic: true}))
                .setDescription(`Total Warns: ${res.length}`)
                .setTimestamp()
                .setFooter(
                    "Requested by " + message.author.username,
                    message.author.displayAvatarURL({
                        format: "png",
                        dynamic: true
                    })
                );
            for(let i=0;i<res.length;i++) sendEm.addField(`ID: ${res[i].id}`,`By: <@${res[i].by}>\nReason: ${res[i].reason}`)
            message.channel.send(sendEm);
        });
    }


}