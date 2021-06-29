let Discord = require('discord.js')
let config = require('../config.json')
let util = require("util")
module.exports = {
    name: "eval",
    description: "Evaluate",
    usage: "eval (code)",
    hide: true,
    execute(message, args, client) {
    if (config.owner !== message.author.id) return message.channel.send(":" + config.emoji_x + ": You're not allowed to do this!");
    let input = args.join(" ");
    if (input.length > 30) input = args.join(" ").slice(0, 30) + "..";

        try {
        let response = util.inspect(eval(args.join(" ")), {
            depth: 0
        });
        client.sendEmbed(message, client,input, "Output:\n```" + response + "```");
    } catch(err) {
        client.sendEmbed(message, client, input, "Output:\n```Error: " + err + "```");

    }
    }
}