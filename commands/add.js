var inquirer = require('inquirer');
var firebase = require('../utils/firebase.js');

var init = function() {
  inquirer.prompt([
    {
      type: "list",
      name: "add",
      message: "What would you like to add?",
      choices: [
        "Add a member to a team",
        "Add a team to the organization",
        "Exit"
      ]
    },
  ], function(answers) {
    resolveType(answers.add);
  });
};


var resolveType = function(input) {
  if (input === 'Add a member to a team') {
    addMemberSelectTeam();
  } else if (input === 'Exit') {
    process.exit();
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
    firebase.addTeam(answers.teamName);
  });
};

var addMemberSelectTeam = function() {
  firebase.getTeams(function(teamList) {
    inquirer.prompt([
      {
        type: "list",
        name: "teamSelect",
        message: "Select the team you would like to add the person to",
        choices: teamList
      },
    ], function(answers) {
      addMemberInput(answers.teamSelect);
    }); 
  });
};

var addMemberInput = function(teamSelect) {
  inquirer.prompt([
    {
      type: "input",
      name: "employeeName",
      message: "Enter the name of the team member"
    },
    {
      type: "input",
      name: "employeeEmail",
      message: "Enter the email of the team member"
    }, 
  ], function(answers) {
    firebase.addMember(teamSelect, answers);
  }); 
};

module.exports = init;
