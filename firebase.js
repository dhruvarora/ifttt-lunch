var Firebase = require("firebase");
var ref = new Firebase("https://ifttt-lunch.firebaseio.com");

var teams = ref.child("teams");

var addTeam = function(teamName) {
  teamRef = teams.child(teamName);
  teamRef.set("", function(error) {
    if (error) {
      console.log('Error writing to Firebase');
      process.exit();
    }
    else {
      console.log('Team added!');
      process.exit();
    }
  });
};

var addMember = function(teamName, member) {
  teamRef = teams.child(teamName);
  memberRef = teamRef.child(member.employeeName);
  memberRef.set(member.employeeEmail, function(error) {
    if (error) {
      console.log('Error writing to Firebase');
      process.exit();
    }
    else {
      console.log('\nMember added!');
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

exports.addTeam = addTeam;
exports.addMember = addMember;
exports.getTeams = getTeams;
