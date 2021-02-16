let Discord = require('discord.js')
let config = require('../config.json')
module.exports = {
    name: "eval",
    description: "Evaluate",
    usage: "eval (code)",
    hide: true,
    execute(message, args, client) {
    if (config.owner !== message.author.id) return message.channel.send(":" + config.emoji_x + ": You're not allowed to do this!");
    let response = eval(args.join(" "));
    client.sendEmbed(message,client,args.join(" ").slice(1,20) + "..","Output:\n```" + response + "```");
    }
}