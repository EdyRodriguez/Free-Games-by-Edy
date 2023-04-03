const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { url } = req.query;
  if (!url) {
    res.status(400).send('Missing "url" query parameter');
    return;
  }

  try {
    console.log(`Fetching ${url}`);
    const response = await fetch(url);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};