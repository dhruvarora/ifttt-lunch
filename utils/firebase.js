var Firebase = require("firebase");
var chalk = require("chalk");
var ref = new Firebase("https://ifttt-lunch.firebaseio.com");

var teams = ref.child("teams");
var employeeFirebase = ref.child("employees");


/* Takes in a team name and adds it to the Firebase at
 * url/teams/teamName
 */
var addTeam = function(teamName) {
  teamRef = teams.child(teamName);
  teamRef.set("", function(error) {
    if (error) {
      console.log(chalk.red('Error writing to Firebase'));
      process.exit();
    }
    else {
      console.log(chalk.green('\nTeam added!'));
      process.exit();
    }
  });
};

/* Takes in a team name and employee/member name, add its to the Firebase at
 * url/teams/teamName/employee. Then calls updateEmployee()
 */
var addEmployee = function(teamName, employee) {
  teamRef = teams.child(teamName);
  employeeRef = teamRef.child(employee.employeeName);
  employeeRef.set(employee.employeeEmail, function(error) {
    if (error) {
      console.log(chalk.red('Error writing to Firebase'));
      process.exit();
    }
    else {
      console.log(chalk.green('\nEmployee added!'));
      updateEmployee(teamName, employee);
    }
  });
};


var updateEmployee = function(teamName, employee) {
  employeeRef = employeeFirebase.child(employee.employeeName);
  teamRef = employeeRef.child(teamName);
  teamRef.set("", function(error) {
    if (error) {
      console.log(chalk.red('Error writing to Firebase'));
      process.exit();
    }
    else {
      console.log(chalk.green('Employee updated!'));
      process.exit();
    }
  });
};

var getTeams = function(callback) {
  teams.orderByKey().once("value", function(snapshot) {
    var teams = Object.keys(snapshot.val());
    callback(teams);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
};

var getOrganization = function(callback) {
  teams.orderByKey().once("value", function(snapshot) {
    var organization = snapshot.val();
    callback(organization);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
};

exports.addTeam = addTeam;
exports.addEmployee = addEmployee;
exports.getTeams = getTeams;
exports.getOrg = getOrganization;
