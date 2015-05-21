var inquirer = require('inquirer');

var init = function() {
  inquirer.prompt([
    {
      type: "list",
      name: "add",
      message: "What would you like to add?",
      choices: [
        "Add a member to a team",
        "Add a team to the organization"
      ]
    },
  ], function(answers) {
    resolveType(answers.add);
  });
};


var resolveType = function(input) {
  if (input === 'Add a member to a team') {
    addMember();
  } else {
    addTeam();
  }
};

var addTeam = function() {
  inquirer.prompt([
    {
      type: "input",
      name: "teamName",
      message: "Enter the name of the team you would like to add"
    }
  ], function(answers) {
    console.log("You've added team " + answers.teamName);
  });
};

module.exports = init;
