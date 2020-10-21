const lib = require('./lib');
const { STATE } = require('./constants');
const discordLib = require('./discord-lib');
const cmdRoll = require('./cmd-roll');

var users = {};
var addOrFindUser = function (discordUser) {
    //console.log(discordUser.id);
    if (discordUser.id in users === false) {
        users[discordUser.id] = discordUser;
        users[discordUser.id].lastSkill = 0;
        users[discordUser.id].lastStress = 0;
        users[discordUser.id].pushed = false;
    }
    return users[discordUser.id];
}

var push = function (discordMessage) {
    var thisUser = addOrFindUser(discordMessage["author"]);
    if (thisUser.lastSkill != 0) {
        if (thisUser.pushed === false) {
            // This is awful! How to create an anonynous initialised array?
            var args = [];
            args.push(thisUser.lastSkill + "+" + (thisUser.lastStress + 1));
            cmdRoll.roll(discordMessage, args);
            // ^^ This will implicitly call setRoll BTW
            thisUser.pushed = true;
        } else {
            discordLib.showError(discordMessage, "Nope, you've already pushed this roll.");
        }
    } else {
        discordLib.showError(discordMessage, "You haven't rolled yet!");
    }
}

var setRoll = function(discordMessage, skill, stress) {
    var thisUser = addOrFindUser(discordMessage["author"]);
    thisUser.lastSkill = skill;
    thisUser.lastStress = stress;
    thisUser.pushed = false;
}

exports.push = push;
exports.setRoll = setRoll;