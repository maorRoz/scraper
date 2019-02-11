const cheerio = require('cheerio');
const fetcher = require('./fetcher.js');
const amazonScraper = require('./amazonScraper');
const ebayScraper = require('./ebayScraper');
const db = require('../db');

const scrap = (urls) => {
  urls.forEach(async (url) => {
    const data = await fetcher.fetch(url);
    if(!data){
      return;
    }
    const $ = cheerio.load(data);
    const product = url.includes('amazon') ? amazonScraper($) : ebayScraper($);
    db.saveProduct(product);
  });
};

module.exports = {
  scrap
};
