/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const url = 'https://api.ipify.org?format=json';

const fetchMyIP = function(callback) {
  needle.get(url, (error, response, body) => {
    // error can be set if invalid domain or user is offline, etc.
    if (error) return callback(error, null);

    // when non-200 status, assume server error
    if (response.statusCode !==200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    } 

      const ip = body.ip;
      return callback(null, ip);
  });
};

module.exports = { fetchMyIP };
