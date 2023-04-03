import fetch from 'node-fetch';

export default async (req, res) => {
  console.log('CORS proxy function called with query:', req.query);

  if (!req.query.url) {
    console.error('Missing "url" query parameter');
    return res.status(400).send('Missing "url" query parameter');
  }

  try {
    const response = await fetch(req.query.url);
    const data = await response.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With'
    );

    res.status(response.status);
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }
    console.log('Sending response with data', data);
    res.send(data);
  } catch (error) {
    console.error('Error fetching data from the URL:', error);
    res.status(500).send(`Error fetching data from the URL: ${error.message}`);
  }
};
