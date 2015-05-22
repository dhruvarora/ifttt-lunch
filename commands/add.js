var inquirer = require('inquirer');
var firebase = require('../utils/firebase.js');

var init = function() {
  inquirer.prompt([
    {
      type: "list",
      name: "add",
      message: "What would you like to add?",
      choices: [
        "Add a employee to a team",
        "Add a team to the organization",
        "Exit"
      ]
    },
  ], function(answers) {
    resolveType(answers.add);
  });
};


var resolveType = function(input) {
  if (input === 'Add a employee to a team') {
    addEmployeeSelectTeam();
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

var addEmployeeSelectTeam = function() {
  firebase.getTeams(function(teamList) {
    inquirer.prompt([
      {
        type: "list",
        name: "teamSelect",
        message: "Select the team you would like to add the employee to",
        choices: teamList
      },
    ], function(answers) {
      addEmployeeInput(answers.teamSelect);
    }); 
  });
};

var addEmployeeInput = function(teamSelect) {
  inquirer.prompt([
    {
      type: "input",
      name: "employeeName",
      message: "Enter the name of the team employee"
    },
    {
      type: "input",
      name: "employeeEmail",
      message: "Enter the email of the team employee"
    }, 
  ], function(answers) {
    firebase.addEmployee(teamSelect, answers);
  }); 
};

module.exports = init;
