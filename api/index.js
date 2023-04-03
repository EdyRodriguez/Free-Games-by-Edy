const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Check if the url query parameter is provided
  if (!req.query.url) {
    return res.status(400).send('Missing "url" query parameter');
  }

  try {
    const response = await fetch(req.query.url);
    const data = await response.text();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With'
    );

    // Forward the response status and headers
    res.status(response.status);
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    // Send the response data
    res.send(data);
  } catch (error) {
    res.status(500).send(`Error fetching data from the URL: ${error.message}`);
  }
};