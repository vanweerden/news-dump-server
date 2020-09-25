const express = require('express');
const path = require('path');
const fetchNewsFrom = require('./fetch');
const config = require('./config');

const app = express();
const { port, hostname } = config.app;

app.get('/', (req, res) => {
  try {
    let json = fetchNewsFrom('abc');
    // send json news
  } catch(e) {
    console.log(e);
  }
});

app.post('/', (req, res) => {
  // do something with request
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
