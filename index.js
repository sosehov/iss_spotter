const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

let timestamp = 1736147047;
let date = new Date(timestamp * 1000); // multiply by 1000 to convert to milliseconds
console.log(date.toString());

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // Success, print out the dates!
  printPassTimes(passTimes);
});