require('dotenv').config();
const lib = require('./lib');
const { STATE } = require('./constants');
const { Client } = require('discord.js');
const client = new Client();
const assets = require('./assets');
const cmdTest = require('./cmd-test');
const cmdRoll = require('./cmd-roll');
const cmdRoster = require('./cmd-roster');
const cmdInit = require('./cmd-init');

var state = STATE.IDLE;

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
  } else if (msg.content.substr(0, 5) === "!init") {
    if (args[1] === 'roll') {
      cmdInit.roll(msg);
    }
  } else if (args[0] === "!roster") {
    if (args[1] === 'add' && args.length === 3) {
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
});

client.login(process.env.DISCORD_TOKEN);