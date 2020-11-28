module.exports = {
    name: "announce",
    description: "Send an Announcement",
    usage: "announce Title | Body",
    needs: 'MANAGE_MESSAGES',
    execute(message,args,client) {
        if (!args[1]) return client.usage(message, "announce");
        if (args.join(" ").indexOf("|") == -1) return client.usage(message, "embed")
        var title = args.join(" ").substr(0,args.join(" ").indexOf('|')).slice(0,-1);
        var body = args.join(" ").substr(args.join(" ").indexOf('|')).slice(2);
        client.sendEmbed(message, client, title, body,"Announcement");
    }
}