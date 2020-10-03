const { MessageAttachment, MessageEmbed } = require('discord.js');

var showError = function (discordMessage, text) {
    discordMessage.channel.send(text)
}

var sendMessageEmbed = function (discordMessage, title, message) {
    const embed = new MessageEmbed()
        .setTitle(title)
        .setColor(0xff0000)
        .setDescription(message);
    discordMessage.channel.send(embed);
}

var sendMessageEmbedWithCanvas = function (discordMessage, canvas) {
    const attachment = new MessageAttachment(canvas.toBuffer(), "dice.jpg");
    const embed = new MessageEmbed()
        // The attachment name may seem irrelevant when it's a canvas 
        // out of RAM, but it has to be a type recognised by Discord.
        .attachFiles(attachment)
        .setImage('attachment://dice.jpg')
        //.setTitle('A slick little embed')
        .setColor(0xff0000)
    //.setDescription('Hello, this is a slick embed!');
    // Send the embed to the same channel as the message
    discordMessage.channel.send(embed);
}

var awaitAnswerFromAuthor = function (discordMessage, onAnswer, errormsg) {
    console.log(errormsg);
    discordMessage.channel.awaitMessages(m => m.author.id == discordMessage.author.id,
        { max: 1, time: 10000 }).then(collected => {
            // only accept messages by the user who sent the command
            // accept only 1 message, and return the promise after timeout
            // first (and, in this case, only) message of the collection
            var answer = collected.first().content.toLowerCase();
            onAnswer(answer);
        }).catch((e) => {
            console.log(e)
            discordMessage.channel.send(errormsg);
        });
}

exports.showError = showError;
exports.sendMessageEmbed = sendMessageEmbed;
exports.sendMessageEmbedWithCanvas = sendMessageEmbedWithCanvas;
exports.awaitAnswerFromAuthor = awaitAnswerFromAuthor;