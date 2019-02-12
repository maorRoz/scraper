const { EventEmitter } = require('events');
const webScrapProperties = require('./webScrapProperties');
const scrapParser = require('./scrapParser');
const fetcher = require('./fetcher.js');
const db = require('../db');

const scrapEventEmitter = new EventEmitter();

const { scrapProperties } = webScrapProperties;

const executeUpload = product => scrapEventEmitter.emit('upload', product);

const executeParse = (url, $) => {
  const scrapProperty = scrapProperties.find(item => url.includes(item.urlDomain));
  const { properties } = scrapProperty || {};
  scrapEventEmitter.emit('parse', $, properties, executeUpload);
};

const executeFetch = url => scrapEventEmitter.emit('fetch', url, executeParse);

const scrap = (urls) => {
  scrapEventEmitter.on('fetch', fetcher.fetch);
  scrapEventEmitter.on('parse', scrapParser.parse);
  scrapEventEmitter.on('upload', db.saveProduct);
  urls.forEach(url => executeFetch(url));
};

module.exports = {
  scrap
};
