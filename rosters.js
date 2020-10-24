const fs = require("fs")

global.availableRosters = [];

exports.load = function () {
    try {
        availableRosters = fs.readdirSync("./rosters")
        //console.log(availableRosters)
      } catch(e) {
        console.log("No rosters found, or invalid JSON.");
      }
}