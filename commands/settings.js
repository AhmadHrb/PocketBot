const config = require("../config.json");

module.exports = {
    name: "settings",
    description: "Change guild settings",
    usage: "settings <setting> <value>",
    needs: "MANAGE_GUILD",
    execute(message,args,client) {
        if (!args[0]) return client.usage(message,"settings");
    let setting = args[0];
    switch(setting) {
        case "log":
            let log = client.log[message.guild.id] || "None";
            if (!args[1]) return client.sendEmbed(message,client,"Log:","**Current Log**:\n <#" + log + ">\n\n**Change Log**:\n```" + config.prefix + "settings log #logs```");
            if (args[1] == "none") return deleteLog(message,client);
            if (args[1]) setLog(message,args[1],client);
            break;
    }
    }
}

function setLog(message, logChannel,client) {
    if (!client.channels.cache.get(logChannel.slice(2,-1))) return client.sendEmbed(message,client,`:${config.emoji_x}: Error!`,"Please tag a channel!")
    var dbo = client.db.db("pocket_bot");
    var query = { guild: message.guild.id }

    dbo.collection("log").find(query).toArray(function (err, result) {
        if (result.length > 0) {
            var newvalues = { $set: { log: logChannel.slice(2,-1) } };
            dbo.collection("log").updateOne(query, newvalues, function (err, res) {
                if (err) throw err;
                client.log[message.guild.id] = logChannel.slice(2,-1)
                client.sendEmbed(message,client,`:${config.emoji_success}: Success!`,"Updated Log channel to: " + logChannel)
            });
        } else {

            var log = { guild: message.guild.id, log: logChannel.slice(2,-1) };
            dbo.collection("log").insertOne(log, function (err, res) {
                if (err) throw err;

                client.log[message.guild.id] = logChannel.slice(2,-1)
                client.sendEmbed(message,client,`:${config.emoji_success}: Success!`,"Updated Log channel to: " + logChannel)
            });
        }
    });
}


function deleteLog(message, client) {
    var dbo = client.db.db("pocket_bot");
    var query = { guild: message.guild.id }

    dbo.collection("log").find(query).toArray(function (err, result) {
        if (result.length > 0) {
            dbo.collection("log").deleteOne(query, function (err) {
                if (err) throw err;
                client.log[message.guild.id] = null;
                client.sendEmbed(message,client,`:${config.emoji_success}: Success!`,"Updated Log channel to: NONE")
            });
        } else return client.sendEmbed(message,client,`:${config.emoji_x}: Error!`,"You don't have a log channel!")
    });
}
