const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use('/', (req, res) => {
  const url = req.originalUrl.slice(1);
  console.log(url);
  const requestOptions = {
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0',
    },
    followRedirect: true,
  };

  req.pipe(request(requestOptions)).pipe(res);
});

app.listen(PORT, () => {
  console.log(`CORS Proxy is running on port ${PORT}`);
});
