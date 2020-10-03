const lib = require('./lib');
const { STATE } = require('./constants');
const discordLib = require('./discord-lib');
const cmdRoster = require('./cmd-roster');

var roll = function(discordMessage) {
    lib.shuffle(roster);
    cmdRoster.listRoster(discordMessage);
}

exports.roll = roll;