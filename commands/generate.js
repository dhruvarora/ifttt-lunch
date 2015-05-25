var initPairings = require('../utils/initpairings.js');

var init = function() {
  initPairings(function(results){
    console.log(results);
    process.exit();
  });  
};


module.exports = init;
