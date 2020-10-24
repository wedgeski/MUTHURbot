require('dotenv').config();
const lib = require('./lib');
const { ASSETS_DIR, ROSTERS_DIR } = require('./constants');
const { Client } = require('discord.js');
const client = new Client();
const assets = require(ASSETS_DIR);
const cmdTest = require('./cmd-test');
const cmdRoll = require('./cmd-roll');
const cmdPush = require('./cmd-push');
const cmdRoster = require('./cmd-roster');
const cmdInit = require('./cmd-init');
const constants = require('./constants');

var commands = [
  {
    name: "test",
    desc: "Run a large-volume die roll and inspect the results!",
    example: "!test d6 1000000",
    args: [
      {
        name: "d6",
        desc: "Test roll d6's",
        example: "!test d6 1000000"
      }
    ]
  }
]

function checkAlienGM(discordMessage) {
  if (!discordMessage.member.roles.cache.some(role => role.name === constants.GMROLE)) {
    discordMessage.channel.send("You must have the GM role to perform this action.");
    return false;
  }
  return true;
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  assets.load();
});

client.on('message', msg => {
  var args = msg.content.split(' ');
  if (args[0] === "!test") {
    cmdTest.test(msg, args.splice(1));
  } else if (args[0] === "!roll") {
    cmdRoll.roll(msg, args.splice(1));
  } else if (args[0] === "!push") {
    cmdPush.push(msg);
  } else if (msg.content.substr(0, 5) === "!init") {
    if (checkAlienGM(msg)) {
      if (args[1] === 'roll') {
        cmdInit.roll(msg);
      }
    }
  } else if (args[0] === "!roster") {
    if (checkAlienGM(msg)) {
      if (args[1] === 'load') {
        cmdRoster.load(msg);
      } else if (args[1] === 'add' && args.length === 3) {
        cmdRoster.add(msg, args.splice(2));
      } else if (args[1] === 'add' && args.length === 2) {
        cmdRoster.addMonster(msg);
      } else if (args.length === 1 || args[1] === 'list') {
        cmdRoster.listRoster(msg);
      } else if (args[1] === 'remove') {
        cmdRoster.remove(msg);
      } else if (args[1] === 'reset') {
        cmdRoster.reset(msg);
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);