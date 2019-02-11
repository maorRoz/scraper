const { expect } = require('chai');
const sinon = require('sinon');
const Product = require('../../models/Product');
const fetcher = require('../../scraper/fetcher');
const db = require('../../db');
const scraper = require('../../scraper');

const scrapAndCompare = async (url, html, expectedProduct) => {
  sinon.stub(fetcher, 'fetch').callsFake(() => html);
  let actualProduct;
  sinon.stub(db, 'saveProduct').callsFake((product) => { actualProduct = product; });

  await scraper.scrap([url]);
  expect(actualProduct).to.deep.equal(expectedProduct);
};

describe('scarper tests', () => {
  const itemTitle = 'test';
  const itemPrice = '19.99$';

  it('amazon scraping', () => {
    const divItemTitle = `<div id="productTitle">${itemTitle}</div>`;
    const divItemPrice = `<div id="priceblock_ourprice">${itemPrice}</div>`;
    const url = 'http://www.amazon.com';
    const html = divItemTitle + divItemPrice;
    const product = new Product(itemTitle, itemPrice);
    return scrapAndCompare(url, html, product);
  });

  it('ebay scraping', () => {
    const divItemTitle = `<div id="itemTitle">${itemTitle}</div>`;
    const divItemPrice = `<div id="prcIsum">${itemPrice}</div>`;
    const url = 'http://www.ebay.com';
    const html = divItemTitle + divItemPrice;
    const product = new Product(itemTitle, itemPrice);
    return scrapAndCompare(url, html, product);
  });

  it('error when fetching', () => {
    const url = 'http://www.ebay.com';
    const html = undefined;
    const product = undefined;
    return scrapAndCompare(url, html, product);
  });

  afterEach(() => {
    fetcher.fetch.restore();
    db.saveProduct.restore();
  });
});
