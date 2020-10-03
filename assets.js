const { DICETYPE, IMAGESIZE } = require('./constants')
const lib = require('./lib');
const { loadImage } = require('canvas');

function getImagePath(diceType, value, imageSize) {
    return './assets/' + diceType + '_' + value + '_' + imageSize + '.jpg';
}

async function loadDiceImages() {
    var allPromises = [];
    for (i = 0; i < 6; i++) {
        var imagePath = getImagePath(DICETYPE.TASK, i + 1, IMAGESIZE.SMALL);
        allPromises.push(loadImage(imagePath));
    }
    TaskDiceImages = await Promise.all(allPromises);
    allPromises = [];
    for (i = 0; i < 6; i++) {
        var imagePath = getImagePath(DICETYPE.STRESS, i + 1, IMAGESIZE.SMALL);
        allPromises.push(loadImage(imagePath));
    }
    StressDiceImages = await Promise.all(allPromises);
    //console.log(TaskDiceImages);
    //console.log(StressDiceImages);
}

exports.load = function () {
    loadDiceImages();
}