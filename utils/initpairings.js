var firebase = require('./firebase.js');
var flatten = require('lodash.flatten');
var unique = require('lodash.uniq');
var employeePairsDict = {};

/* Takes a callback and processes over all the employee pairings possible */
var generateEmployeeMatches = function(employee, callback) {
  var results = [];
  firebase.getEmployeeTeams(employee, function(data) {
    //console.log(employee + " is in " + data);
    listTeamEmployees(0, data.length, data, results, employee, callback);
  });
};


/* Goes through a list of teams and returns an array of all the employees in
 * those teams */
var listTeamEmployees = function(start, length, employeeTeam, results, employee, callback) {
  if (start < length) {
    firebase.getTeamsEmployees(employeeTeam[start], function(data) {
      //console.log("Looking for " + employee + " in " + data);
      var index = data.indexOf(employee);
      if (index > -1) data.splice(index, 1); 
      results.push(data);
      //console.log(data + " work in " + employeeTeam[start]);
      start += 1;
      listTeamEmployees(start, length, employeeTeam, results, employee, callback);
    });
  } else {
    //console.log ("The net results are " + results + "\n");
    callback(unique(flatten(results)));
  }
};


/* Takes in an array of all employees of the organization and returns
 * a dictionary of pairings */
var employeePairingPopulator = function(start, length, allEmployees, callback) {
  if (start < length) {
    generateEmployeeMatches(allEmployees[start], function(data) {
      employeePairsDict[allEmployees[start]] = data;
      //console.log("The matches for " + allEmployees[start] + " are " + employeePairsDict[allEmployees[start]]);
      start += 1;
      employeePairingPopulator(start, length, allEmployees, callback);
    });
  } else {
    callback(employeePairsDict);
  } 
};


/* Starts off the pairing sequence */
var init = function(callback) {
  firebase.getEmployees(function(allEmployees) {
    //console.log("The array of all employees in the organization are " + allEmployees);
    employeePairingPopulator(0, allEmployees.length, allEmployees, function(results) {
      callback(results);
    });
  });
};


module.exports = init;
