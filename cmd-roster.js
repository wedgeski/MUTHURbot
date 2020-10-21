const lib = require('./lib');
const { STATE } = require('./constants');
const discordLib = require('./discord-lib');

const ENTITYTYPE = {
    PLAYER: 0,
    MONSTER: 1
}

global.roster = [
    {
        type: ENTITYTYPE.PLAYER,
        name: 'Al',
        label: 'Hammer (Alan)',
        initiative: 0,
        actions: 1,
        id: 3
    },
    {
        type: ENTITYTYPE.PLAYER,
        name: 'Jo',
        label: 'Dante (Jo)',
        initiative: 0,
        actions: 1,
        id: 2
    },
    {
        type: ENTITYTYPE.PLAYER,
        name: 'Marc',
        label: 'Mason (Marc)',
        initiative: 0,
        actions: 1,
        id: 4
    },
    {
        type: ENTITYTYPE.PLAYER,
        name: 'Matt',
        label: 'Zmijewski (Matt)',
        initiative: 0,
        actions: 1,
        id: 1
    },
    {
        type: ENTITYTYPE.PLAYER,
        name: 'GM',
        label: 'Chaplain (GM)',
        initiative: 0,
        actions: 1,
        id: 5
    }
]

const MONSTERS = [
    {
        type: ENTITYTYPE.MONSTER,
        name: "Facehugger",
        label: 'Facehugger',
        initiative: 0,
        actions: 2,
        id: 0
    },
    {
        type: ENTITYTYPE.MONSTER,
        name: "Chestburster",
        label: 'Chestburster',
        initiative: 0,
        actions: 2,
        id: 0
    },
    {
        type: ENTITYTYPE.MONSTER,
        name: "Xenomorph stalker",
        label: 'Xenomorph stalker',
        initiative: 0,
        actions: 2,
        id: 0
    },
    {
        type: ENTITYTYPE.MONSTER,
        name: "Xenomorph scout",
        label: "Xenomorph scout",
        initiative: 0,
        actions: 3,
        id: 0
    },
    {
        type: ENTITYTYPE.MONSTER,
        name: "Xenomorph drone",
        label: "Xenomorph drone",
        initiative: 0,
        actions: 2,
        id: 0
    },
]

var rosterFactory = function (name, label, initiative, actions, id) {
    return {
        name: name,
        label: label,
        initiative: initiative,
        action: actions,
        id: id
    }
}

var listRoster = function (discordMessage) {
    var message = "";
    roster.forEach((element, i) => {
        message = message.concat((i + 1) + ". " + element.label + "\r\n");
    })
    discordLib.sendMessageEmbed(discordMessage, "Current roster:", message);
}

var listMonsters = function (discordMessage) {
    var message = "";
    MONSTERS.forEach((element, i) => {
        message = message.concat((i + 1) + ". " + element.label + "\r\n");
    })
    discordLib.sendMessageEmbed(discordMessage, "Available monsters:", message);
}

var getNextIdOfType = function (name) {
    var rc = 0;
    roster.forEach((entity) => {
        if (entity.name === name && entity.id > rc) {
            rc = entity.id;
        }
    })
    return rc + 1;
}

var addMonsterIndex = function (discordMessage, index) {
    if (index >= 0 && index < MONSTERS.length) {
        var id = getNextIdOfType(MONSTERS[index].name);
        for (i = 0; i < MONSTERS[index].actions; i++) {
            // JS pattern for shallow-cloning an object
            var newActor = Object.assign({}, MONSTERS[index]);
            newActor.id = id;
            newActor.label = MONSTERS[index].name + " " + newActor.id;
            newActor.actions = 1;
            roster.push(newActor);
        }
        exports.listRoster(discordMessage);
    }
}

var addMonster = function (discordMessage) {
    discordMessage.channel.send("Select monster to add:");
    listMonsters(discordMessage);
    discordLib.awaitAnswerFromAuthor(discordMessage, answer => {
        if (lib.isNumeric(answer)) {
            addMonsterIndex(discordMessage, answer - 1);
        }
    }, "Tired of waiting! Try again.")
}

var add = function (discordMessage, args) {
    if (args != undefined) {
        roster.push(rosterFactory(args[0], args[0], 0, 1, 0));
    }
    exports.listRoster(discordMessage);
}

var remove = function (discordMessage) {
    discordMessage.channel.send("Select which member to remove:");
    exports.listRoster(discordMessage);
    discordLib.awaitAnswerFromAuthor(discordMessage, answer => {
        if (lib.isNumeric(answer)) {
            exports.removeAt(discordMessage, answer - 1);
        }
    }, "Tired of waiting! Try again.")
}

var removeAt = function (discordMessage, index) {
    if (lib.isNumeric(index) && index >= 0 && index < (roster.length - 1)) {
        discordMessage.channel.send("Removed [" + roster[index].name + "] from the roster");
        roster.splice(index, 1);
    }
}

var reset = function (discordMessage) {
    for (i=roster.length - 1; i >= 0; i--) {
        if (roster[i].type === ENTITYTYPE.MONSTER) {
            roster.splice(i, 1);       
        }
    }
    exports.listRoster(discordMessage);
}

exports.listRoster = listRoster;
exports.add = add;
exports.addMonster = addMonster;
exports.remove = remove;
exports.removeAt = removeAt;
exports.reset = reset;