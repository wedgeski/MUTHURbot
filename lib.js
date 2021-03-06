var isNumeric = function (val) {
  return !isNaN(val)
}

var diceArrayHasVal = function(diceArray, val) {
  return diceArray.includes(val);
}

// https://stackoverflow.com/a/2450976
var shuffle = function (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

exports.isNumeric = isNumeric;
exports.diceArrayHasVal = diceArrayHasVal;
exports.shuffle = shuffle;