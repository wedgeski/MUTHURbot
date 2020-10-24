const lib = require('./lib');
const { MAX_DICE, DICETYPE } = require('./constants');
const discordLib = require('./discord-lib');
const droll = require('droll');
const { createCanvas } = require('canvas')
const cmdPush = require('./cmd-push');

function validateAndRoll(diceType, diceCodeString, dice) {
    if (lib.isNumeric(dice)) {
        if (dice <= MAX_DICE) {
            rolledResults = droll.roll(dice + 'd6');
            //console.log("rolledResults: " + rolledResults);
            if (rolledResults.total != undefined) {
                return rolledResults.rolls;
            }
        } else {
            throw ("Really? More than " + MAX_DICE + " " + diceType + " dice?");
        }
    }
    throw ("[" + diceCodeString + "] is an invalid dice code!");
}

function getSkillDice(diceCodeString) {
    return validateAndRoll(DICETYPE.TASK, diceCodeString, diceCodeString.split('+')[0]);
}

function getStressDice(diceCodeString) {
    if (diceCodeString.split('+').length > 1) {
        return validateAndRoll(DICETYPE.STRESS, diceCodeString, diceCodeString.split('+')[1]);
    }
    return [];
}

function createDiceCanvas(skillDiceArray, stressDiceArray) {
    const canvas = createCanvas((skillDiceArray.length + stressDiceArray.length) * 64, 64);
    const ctx = canvas.getContext('2d');
    skillDiceArray.forEach((element, i) => {
        //console.log("Drawing image, element: " + element + " index: " + i);
        ctx.drawImage(TaskDiceImages[element - 1], i * 64, 0, 64, 64)
    })
    stressDiceArray.forEach((element, i) => {
        //console.log("Drawing image, element: " + element + " index: " + i);
        ctx.drawImage(StressDiceImages[element - 1], (skillDiceArray.length + i) * 64, 0, 64, 64)
    })
    return canvas;
}

exports.roll = function (discordMessage, args) {
    // !roll
    // Roll a task. Whitespace is stripped
    // E.g.
    // !roll 4 -- Roll a task with four skill dice
    // !roll 4+1 -- Roll a task with four skill dice and a stress die
    if (args != undefined && args.length >= 1) {
        var diceCodeString = args[0].trim().replace(' ', '');
        //console.log(diceCodeString)
        var skillDiceArray = [];
        var stressDiceArray = [];
        try {
            skillDiceArray = getSkillDice(diceCodeString);
        } catch (e) {
            // Invalid dice code
            //console.log(e);
            discordLib.showError(discordMessage, e);
            return;
        }
        try {
            stressDiceArray = getStressDice(diceCodeString);
        } catch (e) {
            //console.log(e);
            discordLib.showError(discordMessage, e);
            return;
        }
        cmdPush.setRoll(discordMessage, skillDiceArray, stressDiceArray);
        //console.log("skillDiceArray: " + skillDiceArray);
        var canvas = createDiceCanvas(skillDiceArray, stressDiceArray);
        //console.log(canvas);
        discordLib.sendMessageEmbedWithCanvas(discordMessage, canvas);
    }
}