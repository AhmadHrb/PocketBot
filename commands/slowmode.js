const config = require('../config.json')
module.exports = {
    name: "slowmode",
    description: "Change channel's slowmode",
    needs: 'MANAGE_CHANNELS',
    usage: "slowmode <minutes>",
    execute(message,args,client) {
        if (!args[0]) return client.usage(message,"slowmode");
        message.channel.setRateLimitPerUser(args[0] * 60).then(() => {
            client.sendEmbed(message,client,`:${config.emoji_success}: Success!`,"Changed slowmode to **" + args[0] + "** minutes!");
        })
    }
}