const express = require('express');
const path = require('path');
// const fetchNewsFrom = require('./fetch');
const config = require('./config');

const app = express();
const { port, hostname } = config.app;

app.get('/', (req, res) => {
  res.send('WTF');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
