const needle = require('needle');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

/* const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';
  needle.get(url, (error, response, body) => {
    // Error in case of invalid domain user being offline, etc.
    if (error) return callback(error, null);

    // When non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP.Response: ${body}`;
      return callback(Error(msg), null);
    }
    const ip = body.ip;
    return callback(null, ip);
  });
}; */

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */

/*const fetchCoordsByIP = function(ip, callback) {
  const url = `http://ipwho.is/${ip}`;
  needle.get(url, (error, response, body) => {
    // Error handling in case of invalid domain or offline user, etc
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates.Response: ${body}`;
      return callback(Error(msg), null);
    }

    // Parse the returned body so we can check its information
    // No need for JSON.parse if body is already an object
    const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;

    // check if response was not successful in API terms
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      return callback(Error(message), null);
    }

    const latitude = parsedBody.latitude;
    const longitude = parsedBody.longitude;
    callback(null, {latitude, longitude});
  });
}; */

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  needle.get(url, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      return callback(Error(msg), null);
    }

    // Parse the returned body so we can check its information
    // No need for JSON.parse if body is already an object
    const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;

    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      return callback(Error(message), null);
    }

    const passes = parsedBody.response;
    callback(null, passes);
  });
};

module.exports = { fetchISSFlyOverTimes };