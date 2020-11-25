const lib = require('./lib');
const discordLib = require('./discord-lib');
const cmdRoll = require('./cmd-roll');

var users = {};
var addOrFindUser = function (discordUser) {
    //console.log(discordUser.id);
    if (discordUser.id in users === false) {
        users[discordUser.id] = discordUser;
        users[discordUser.id].lastSkill = [];
        users[discordUser.id].lastStress = [];
        users[discordUser.id].pushed = false;
    }
    return users[discordUser.id];
}

var push = function (discordMessage) {
    var thisUser = addOrFindUser(discordMessage["author"]);
    if (thisUser.lastSkill.length != 0) {
        if (thisUser.pushed === false) {
            if (!lib.diceArrayHasVal(thisUser.lastStress, 1)) {
                var previousTaskSuccesses = thisUser.lastSkill.filter(function(e) {
                    return e === 6;
                });
                var previousStressSuccesses = thisUser.lastStress.filter(function(e) {
                    return e === 6;
                });
                // This is awful! How to create an anonynous initialised array?
                var args = [];
                args.push(thisUser.lastSkill.length - previousTaskSuccesses.length + 
                    "+" + 
                    (thisUser.lastStress.length - previousStressSuccesses.length + 1));
                cmdRoll.roll(discordMessage, args, previousTaskSuccesses, previousStressSuccesses);
                // ^^ This will implicitly call setRoll BTW
                thisUser.pushed = true;
            } else {
                discordLib.showError(discordMessage, "Nope, you panicked during your last roll!");
            }
        } else {
            discordLib.showError(discordMessage, "Nope, you've already pushed your last roll.");
        }
    } else {
        discordLib.showError(discordMessage, "You haven't rolled yet!");
    }
}

var setRoll = function (discordMessage, skill, stress) {
    var thisUser = addOrFindUser(discordMessage["author"]);
    thisUser.lastSkill = skill;
    thisUser.lastStress = stress;
    thisUser.pushed = false;
}

exports.push = push;
exports.setRoll = setRoll;