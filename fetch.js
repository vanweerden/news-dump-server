'use strict'
const https = require('https');
const { API_KEY } = require('./config');

const fetchNews = (source) => {
  source = getFullNameOf(source);
  let url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${API_KEY}`;

  https.get(url, function(response) {
    let error = checkForErrors(response);
    if (error) {
      console.error(error.message);
      response.resume();
      return;
    }

    response.setEncoding('utf8');
    let rawData = '';

    // A chunk of data has been received
    response.on('data', (chunk) => {
      rawData += chunk;
    });
    // Entire response has been received
    response.on('end', () => {
      try {
        const json = parseJSON(rawData);

        // BUG: console.log prints object
        // but returns 'undefined'
        console.log(json);
        return json;
      } catch (error) {
        console.error(error);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}

function getFullNameOf(source) {
  const SOURCES = {
    'abc': 'abc-news-au',
    'ars': 'ars-technica',
    'bbc': 'bbc-news',
    'cbc': 'cbc-news',
    'globe': 'the-globe-and-mail',
    'hacker': 'hacker-news',
    'newsci': 'new-scientist',
    'wpost': 'the-washington-post',
    'wsj': 'the-wall-street-journal',
  };
  return SOURCES[source];
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

// function getHeadlinesFrom(json) {
//   const articles = json.articles;
//   console.log(articles[0].source.name.toUpperCase());
//   for (let i = 0, length = articles.length; i < length; i++) {
//     console.log(i + 1, articles[i].title);
//   }
// }

module.exports = fetchNews;
console.log(fetchNews('abc'));
