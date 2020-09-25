'use strict'
const https = require('https');
const { API_KEY } = require('./config');

const SOURCES = [
  'abc-news-au',
  'ars-technica',
  'bbc-news',
  'cbc-news',
  'the-globe-and-mail',
  'hacker-news',
  'new-scientist',
  'the-washington-post',
  'the-wall-street-journal',
];

function fetchNews(source) {
  let url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${API_KEY}`;

  https.get(url, function(res) {
    let error = checkForErrors(res);
    if (error) {
      console.error(error.message);
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    // Entire body has been received
    res.on('end', () => {
      try {
        const json = parseJSON(rawData);
        const articles = getHeadlinesFrom(json);
      } catch (error) {
        console.error(error);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}

function checkForErrors(res) {
  const { statusCode } = res;
  let error;
  if (statusCode !== 200) {
    error = new Error ('Request failed.\n' +
                       `Status Code: ${statusCode}`);
  }
  return error;
}

function parseJSON(data) {
  const json = JSON.parse(data);
  if (json.status === 'error') {
    throw new Error(json.message);
  }
  return json;
}

function getHeadlinesFrom(json) {
  const articles = json.articles;
  console.log(articles[0].source.name.toUpperCase());
  for (let i = 0, length = articles.length; i < length; i++) {
    console.log(i + 1, articles[i].title);
  }
}
