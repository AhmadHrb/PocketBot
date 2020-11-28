const config = require("../config.json");
module.exports = {
    name: "purge",
    description: "Remove number of messages",
    needs: "MANAGE_MESSAGES",
    usage: "purge <nb>",
    execute(message,args,client) {
        if (!args[0] || !parseInt(args[0])) return client.usage(message,"purge");
        message.channel.bulkDelete(args[0]).then(() => {
            client.sendEmbed(message,client,":" + config.emoji_success + ": Success!","Purged **" + args[0] + "** Messages!");
        })
    }
}