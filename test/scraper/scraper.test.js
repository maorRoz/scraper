const { expect } = require('chai');
const sinon = require('sinon');
const cheerio = require('cheerio');
const Product = require('../../models/Product');
const fetcher = require('../../scraper/fetcher');
const db = require('../../db');
const scraper = require('../../scraper');

const scrapAndCompare = (urlInput, html, expectedProduct) => {
  sinon.stub(fetcher, 'fetch').callsFake((url, parse) => html ? parse(url, cheerio.load(html)) : undefined);
  const saveProductSpy = sinon.stub(db, 'saveProduct').callsFake(() => undefined);

  scraper.scrap([urlInput]);
  return html ? sinon.assert.calledWith(saveProductSpy, expectedProduct) : sinon.assert.notCalled(saveProductSpy);
};

describe('scarper tests', () => {
  const itemTitle = 'test';
  const itemPrice = '19.99$';

  it('amazon scraping', () => {
    const divItemTitle = `<div id="productTitle">${itemTitle}</div>`;
    const divItemPrice = `<div id="priceblock_ourprice">${itemPrice}</div>`;
    const url = 'http://www.amazon.com';
    const html = divItemTitle + divItemPrice;
    const product = new Product({ title: itemTitle, price: itemPrice });
    return scrapAndCompare(url, html, product);
  });

  it('ebay scraping', () => {
    const divItemTitle = `<div id="itemTitle">${itemTitle}</div>`;
    const divItemPrice = `<div id="prcIsum">${itemPrice}</div>`;
    const url = 'http://www.ebay.com';
    const html = divItemTitle + divItemPrice;
    const product = new Product({ title: itemTitle, price: itemPrice });
    return scrapAndCompare(url, html, product);
  });

  it('unknown web domain', () => {
    const divItemTitle = `<div id="itemTitle">${itemTitle}</div>`;
    const divItemPrice = `<div id="prcIsum">${itemPrice}</div>`;
    const url = 'http://www.123.com';
    const html = divItemTitle + divItemPrice;
    const product = new Product({});
    return scrapAndCompare(url, html, product);
  });

  afterEach(() => {
    fetcher.fetch.restore();
    db.saveProduct.restore();
  });
});
