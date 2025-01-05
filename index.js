const { fetchISSFlyOverTimes } = require('./iss');
//const exampleCoords = { latitude: '45.4215296', longitude: '-75.6971931' };
const exampleCoords = { latitude: 45.4215296, longitude: -75.6971931 };
/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);
}); 

fetchCoordsByIP('174.114.143.160',(error, coordinates) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned coordinates:", coordinates);
}); */

fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned array:", passTimes);
});
