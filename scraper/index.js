const cheerio = require('cheerio');
const webScrapProperties = require('./webScrapProperties');
const scrapParser = require('./scrapParser');
const fetcher = require('./fetcher.js');
const db = require('../db');

const scrap = (urls) => {
  const { scrapProperties } = webScrapProperties;
  urls.forEach(async (url) => {
    const data = await fetcher.fetch(url);
    if(!data){
      return;
    }
    const $ = cheerio.load(data);
    const scrapProperty = scrapProperties.find(item => url.includes(item.urlDomain));
    const { properties } = scrapProperty || {};
    const product = scrapParser.parse($, properties);
    db.saveProduct(product);
  });
};

module.exports = {
  scrap
};
