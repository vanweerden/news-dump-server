'use strict'
const fetch = require('node-fetch');
const { API_KEY } = require('./config');

const fetchNews = (source) => {
  source = getFullNameOf(source);
  let url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${API_KEY}`;

  let settings = { method: "Get" };
  fetch(url, settings)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response not ok');
      }
      return res.json();
    })
    .then((json) => {
      console.log(json);
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
