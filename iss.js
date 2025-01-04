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

const fetchCoordsByIP = function(ip, callback) {
  const url = `http://ipwho.is/${ip}`;
  needle.get(url, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates.Response: ${body}`;
      return callback(Error(msg), null);
    }
    
    if (!body.success) {
      const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      return callback(Error(message), null);
    }

    const latitude = body.latitude;
    const longitude = body.longitude;
    callback(null, {latitude, longitude});
  });
};

module.exports = { fetchCoordsByIP };
