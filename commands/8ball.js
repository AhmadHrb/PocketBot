const answers = require("../config/8ball.json")
module.exports = {
    name: "8ball",
    description: "Gives an answer to a question",
    usage: "8ball question",
    execute(message,args,client) {
        if (!args[0]) return client.usage(message,"8ball")
        let random = Math.floor(Math.random() * answers.length);
        client.sendEmbed(message,client,"Answer:",answers[random])
    }
}