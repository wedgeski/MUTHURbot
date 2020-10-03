const lib = require('./lib');
const discordLib = require('./discord-lib');
const droll = require('droll');

d6 = function (discordMsg, size) {
    try {
        if (lib.isNumeric(size) && size < 1000001) {
            discordMsg.channel.send("Rolling " + size + "d6...");
            rolledResults = droll.roll(size + 'd6');
            // Initialised, sized array
            var vals = Array.apply(null, Array(6)).map(function (x, i) { return 0; });
            for (i = 0; i < size; i++) {
                vals[rolledResults.rolls[i] - 1]++;
            }
            for (i = 0; i < 6; i++) {
                discordMsg.channel.send("" + (i + 1) + ": " + vals[i]);
            }
        } else {
            throw 1;
        }
    } catch (e) {
        discordLib.showError("Use '!test d6 100' to roll 100d6")
        discordLib.showError("  Maximum 10^6 dice!")
    }
}

exports.test = function (discordMessage, args) {
    if (args != undefined && args.length >= 1) {
        if (args[0] === 'd6') d6(discordMessage, args[1]);
    }
}