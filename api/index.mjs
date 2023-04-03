import fetch from 'node-fetch';

export default async (req, res) => {
  console.log('CORS proxy function called with query:', req.query);

  if (!req.query.url) {
    console.error('Missing "url" query parameter');
    return res.status(400).send('Missing "url" query parameter');
  }

  try {
    const response = await fetch(req.query.url);

    // Copy the response headers
    const headers = new Headers(response.headers);

    // Remove the 'content-encoding' and 'content-length' headers, as they can cause decoding issues
    headers.delete('content-encoding');
    headers.delete('content-length');

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With'
    );

    // Forward the response status and headers
    res.status(response.status);
    for (const [key, value] of headers.entries()) {
      res.setHeader(key, value);
    }

    // Send the response data as a stream, allowing 'node-fetch' to handle the encoding automatically
    response.body.pipe(res);
  } catch (error) {
    console.error('Error fetching data from the URL:', error);
    res.status(500).send(`Error fetching data from the URL: ${error.message}`);
  }
};