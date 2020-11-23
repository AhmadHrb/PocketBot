const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");
const prefix = config.prefix;

client.color = config.embed_color;
client.login(config.token);

client.on("ready",function () {
    console.log(`${client.user.username} Is ready!`);
})
client.on("message",function (message) {
    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase();

    if (client.commands.has(command)) {
        if (client.commands.get(command).needs) if (!message.member.hasPermission(client.commands.get(command).needs)) return noPermission(message,client.commands.get(command).needs);
        client.commands.get(command).execute(message, args, client);
    }
})

client.usage = function (message, command) {
    if (client.commands.get(command).usage) {
        let usage = client.commands.get(command).usage;
        sendEmbed(message,client,`:${config.emoji_x}: Usage:`,"```" + usage + "```")
    }
}

// Functions
function noPermission(message, perm) {
    let sendEm = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle(`:${config.emoji_x}: You don't have permission!`)
        .setDescription("You need permission: `" + perm + "`")
        .setTimestamp()
        .setFooter(
            "Requested by " + message.author.username,
            message.author.displayAvatarURL({
                format: "png",
                dynamic: true
            })
        );
    message.channel.send(sendEm);
}
// Load Commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    if (command.alias) {
        client.commands.set(command.alias, command)
    }
}
function sendEmbed(message,client, title,desc) {
    let sendEm = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTitle(title)
        .setDescription(desc)
        .setTimestamp()
        .setFooter(
            "Requested by " + message.author.username,
            message.author.displayAvatarURL({
                format: "png",
                dynamic: true
            })
        );
    message.channel.send(sendEm);
}