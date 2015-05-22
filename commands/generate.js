var firebase = require('../utils/firebase.js');

/* Takes a callback and processes over all the employee pairings possible */
var generateEmployeeMatches = function(employee, callback) {
  var employeeMatches = [];
  var employeeTeams = [];
  firebase.getEmployeeTeams(employee, function(data) {
    console.log(employee + " is in " + data);
    employeeTeams = data;
    teamRetriever(0, employeeTeams.length, employeeTeams, employeeMatches, 
      callback);
  });
};

/* Goes through a particular team and returns an array of all the employees in
 * said team */
var teamRetriever = function(start, teamLength, employeeTeams, employeeMatches,
    callback) {
  if (start < teamLength) {
    firebase.getTeamsEmployees(employeeTeams[start], function(data) {
      start += 1;
      teamRetriever(start, teamLength, employeeTeams, employeeMatches, callback);
      employeeMatches.push(data);
    });
  } else {
    console.log(employeeMatches);
    callback(employeeMatches);
  }
};

/* */
var employeePairingPopulator = function(start, length, employeesArray, callback) {
  var employeePairings = {};
  if (start < length) {
    generateEmployeeMatches(employeesArray[start], function(data) {
      employeePairings[employeesArray[start]] = data;
      console.log("The matches for " + employeesArray[start] + " are " + data);
      start += 1;
      employeePairingPopulator(start, length, employeesArray, callback);
    });
  } else {
    callback(employeePairings);
  } 
};

var init = function() {
  console.log('\nGenerating pairs');
  firebase.getEmployees(function(employeesArray) {
    console.log("The array of all employees in the organization are " + employeesArray);
    employeePairingPopulator(0, employeesArray.length, employeesArray, 
      function(employeePairings) {
        console.log(employeePairings);
    });
  });
};

module.exports = init;
