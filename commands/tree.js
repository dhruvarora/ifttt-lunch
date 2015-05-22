var firebase = require('../utils/firebase.js');
var chalk = require('chalk')

var init = function() {
  console.log("\nHere's a quick overview of the IFTTT organization \n");
  var options = {};
  var organization = firebase.getOrg(prettyPrint);
};

function prettyPrint(organization) {
  for (var key in organization) {
    console.log(chalk.green(key));
    for (var childKey in organization[key]) {
      console.log("   " + childKey + " : " + chalk.yellow(organization[key][childKey]));
    }
  }
  process.exit();
}

module.exports = init;
